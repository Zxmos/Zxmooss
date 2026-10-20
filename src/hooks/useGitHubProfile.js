import { useState, useEffect, useCallback } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const CACHE_KEY = 'mark_github_sync_v1';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STATIC_TIMESTAMP = '2025-03-01T00:00:00Z';

const FALLBACK_PROFILE = {
  login: PERSONAL_INFO.githubUsername,
  name: PERSONAL_INFO.name,
  html_url: PERSONAL_INFO.githubUrl,
  avatar_url: PERSONAL_INFO.githubAvatar,
  bio: '4th Year BS Computer Engineering Student at ICCT Main Campus • Embedded Systems, IoT & Software Development',
  location: PERSONAL_INFO.location,
  public_repos: 2,
  followers: 0,
  following: 0,
};

const FALLBACK_REPOS = [
  {
    id: 'fallback-my-first-project',
    name: 'my-first-project',
    full_name: 'Zxmos/my-first-project',
    html_url: 'https://github.com/Zxmos/my-first-project',
    description:
      'Contains ERecPass-Mobile (Electronic Health-Record & Emergency-Pass application built with Capacitor & Supabase PostgreSQL RLS).',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: STATIC_TIMESTAMP,
    topics: ['capacitor', 'supabase', 'postgresql', 'mobile'],
  },
  {
    id: 'fallback-portfolio',
    name: 'portfolio',
    full_name: 'Zxmos/portfolio',
    html_url: 'https://github.com/Zxmos/portfolio',
    description:
      'Living Japanese Sumi-e & Ukiyo-e Computer Engineering portfolio with bidirectional bamboo scroll physics and day/night ink-cloud transitions.',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: STATIC_TIMESTAMP,
    topics: ['react', 'vite', 'sumi-e', 'portfolio'],
  },
];

function getInitialGitHubState() {
  try {
    const cachedRaw = sessionStorage.getItem(CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return {
          profile: cached.profile,
          repos: cached.repos,
          status: 'cached',
          lastSynced: new Date(cached.timestamp),
          error: null,
        };
      }
    }
  } catch {
    // Ignore sessionStorage read errors
  }

  return {
    profile: FALLBACK_PROFILE,
    repos: FALLBACK_REPOS,
    status: 'loading',
    lastSynced: null,
    error: null,
  };
}

/**
 * Live GitHub Profile & Repository Hook for @Zxmos
 * Fetches real-time public profile and repository data from the GitHub REST API
 * with sessionStorage caching and automatic offline/rate-limit fallback.
 */
export function useGitHubProfile(username = PERSONAL_INFO.githubUsername) {
  const [state, setState] = useState(getInitialGitHubState);

  const performFetch = useCallback(async (targetUser) => {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(targetUser)}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(
          targetUser
        )}/repos?sort=updated&per_page=6`,
        {
          headers: { Accept: 'application/vnd.github.v3+json' },
        }
      ),
    ]);

    if (!profileRes.ok) {
      throw new Error(`GitHub API responded with status ${profileRes.status}`);
    }

    const profileData = await profileRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const normalizedProfile = {
      login: profileData.login || FALLBACK_PROFILE.login,
      name: profileData.name || FALLBACK_PROFILE.name,
      html_url: profileData.html_url || FALLBACK_PROFILE.html_url,
      avatar_url: profileData.avatar_url || FALLBACK_PROFILE.avatar_url,
      bio: profileData.bio || FALLBACK_PROFILE.bio,
      location: profileData.location || FALLBACK_PROFILE.location,
      public_repos:
        typeof profileData.public_repos === 'number'
          ? profileData.public_repos
          : FALLBACK_PROFILE.public_repos,
      followers:
        typeof profileData.followers === 'number' ? profileData.followers : 0,
      following:
        typeof profileData.following === 'number' ? profileData.following : 0,
    };

    const normalizedRepos =
      Array.isArray(reposData) && reposData.length > 0
        ? reposData
            .filter((r) => !r.fork)
            .slice(0, 6)
            .map((r) => ({
              id: r.id,
              name: r.name,
              full_name: r.full_name,
              html_url: r.html_url,
              description:
                r.description ||
                'Public engineering repository maintained by Mark Anthony L. Duhig Jr. (@Zxmos).',
              language: r.language || 'Code',
              stargazers_count: r.stargazers_count || 0,
              forks_count: r.forks_count || 0,
              updated_at: r.updated_at,
              topics: Array.isArray(r.topics) ? r.topics : [],
            }))
        : FALLBACK_REPOS;

    const now = Date.now();
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          timestamp: now,
          profile: normalizedProfile,
          repos: normalizedRepos,
        })
      );
    } catch {
      // Ignore storage quota errors
    }

    return {
      profile: normalizedProfile,
      repos: normalizedRepos,
      status: 'live',
      lastSynced: new Date(now),
      error: null,
    };
  }, []);

  useEffect(() => {
    if (state.status === 'cached') {
      return undefined;
    }

    let cancelled = false;

    performFetch(username)
      .then((nextState) => {
        if (!cancelled) {
          setState(nextState);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState((prev) => ({
            profile: prev.profile || FALLBACK_PROFILE,
            repos:
              prev.repos && prev.repos.length > 0 ? prev.repos : FALLBACK_REPOS,
            status: 'fallback',
            lastSynced: prev.lastSynced,
            error:
              err instanceof Error
                ? err.message
                : 'GitHub connection fallback active',
          }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username, state.status, performFetch]);

  const refreshGitHub = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }));
    performFetch(username)
      .then((nextState) => {
        setState(nextState);
      })
      .catch((err) => {
        setState((prev) => ({
          profile: prev.profile || FALLBACK_PROFILE,
          repos:
            prev.repos && prev.repos.length > 0 ? prev.repos : FALLBACK_REPOS,
          status: 'fallback',
          lastSynced: prev.lastSynced,
          error:
            err instanceof Error
              ? err.message
              : 'GitHub connection fallback active',
        }));
      });
  }, [username, performFetch]);

  return {
    ...state,
    refreshGitHub,
  };
}
