import React, { useState, useRef } from 'react';
import {
  Mail,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Send,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Code2,
} from 'lucide-react';
import { PERSONAL_INFO, CONTACT_CONFIG } from '../data/portfolioData';

const INQUIRY_TOPICS = [
  'Embedded Systems & ESP32',
  'Mobile & Supabase Dev',
  'Computer Engineering Collaboration',
  'General Opportunity',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactSection({ theme }) {
  const isNight = theme === 'night';

  // Copy email state
  const [copyState, setCopyState] = useState('idle'); // 'idle' | 'copied' | 'error'

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: INQUIRY_TOPICS[0],
    message: '',
    honeypot: '', // hidden anti-spam field
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'activation_needed' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const lastSubmitTimeRef = useRef(0);

  const destinationEmail = CONTACT_CONFIG.destinationEmail || PERSONAL_INFO.email;

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(destinationEmail);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = destinationEmail;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!ok) {
          throw new Error('Clipboard copy command failed');
        }
      }
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 2600);
    } catch {
      setCopyState('error');
      window.setTimeout(() => setCopyState('idle'), 3000);
    }
  };

  const handleTopicSelect = (topic) => {
    setFormData((prev) => ({ ...prev, subject: topic }));
    if (errors.subject) {
      setErrors((prev) => ({ ...prev, subject: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitStatus === 'error' || submitStatus === 'activation_needed') {
      setSubmitStatus('idle');
      setStatusMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!trimmedSubject || trimmedSubject.length < 3) {
      newErrors.subject = 'Please specify a subject for your inquiry.';
    }
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = 'Please write a message of at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Pre-filled mailto link that includes the visitor's current form inputs if present
  const buildMailtoHref = () => {
    const subjectText = formData.subject.trim()
      ? `[Portfolio Inquiry] ${formData.subject.trim()}`
      : `[Portfolio Inquiry] Collaboration — Mark Anthony L. Duhig Jr.`;

    const bodyParts = [];
    if (formData.name.trim()) {
      bodyParts.push(`Name: ${formData.name.trim()}`);
    }
    if (formData.email.trim()) {
      bodyParts.push(`Reply-To: ${formData.email.trim()}`);
    }
    if (formData.message.trim()) {
      bodyParts.push(`\nMessage:\n${formData.message.trim()}`);
    }

    const query = new URLSearchParams();
    query.set('subject', subjectText);
    if (bodyParts.length > 0) {
      query.set('body', bodyParts.join('\n'));
    }

    return `mailto:${destinationEmail}?${query.toString().replace(/\+/g, '%20')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent rapid duplicate submissions
    const now = Date.now();
    if (submitStatus === 'submitting' || now - lastSubmitTimeRef.current < 2500) {
      return;
    }

    // Honeypot check: silently ignore automated spam bots
    if (formData.honeypot) {
      setSubmitStatus('success');
      setStatusMessage('Your message has been dispatched.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    lastSubmitTimeRef.current = now;
    setSubmitStatus('submitting');
    setStatusMessage('');

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: `[Portfolio] ${formData.subject.trim()}`,
      message: formData.message.trim(),
      _subject: `[Portfolio Inquiry] ${formData.subject.trim()} — from ${formData.name.trim()}`,
      _replyto: formData.email.trim(),
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const customFormspreeUrl = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      let response;
      let data = {};

      if (customFormspreeUrl) {
        response = await fetch(customFormspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        data = await response.json().catch(() => ({}));
      } else if (web3FormsKey) {
        response = await fetch(CONTACT_CONFIG.web3FormsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: payload.name,
            email: payload.email,
            subject: payload._subject,
            message: payload.message,
          }),
        });
        data = await response.json().catch(() => ({}));
      } else {
        // Default: FormSubmit AJAX delivery to markanthonylduhigjr@gmail.com
        response = await fetch(CONTACT_CONFIG.formSubmitAjaxUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });
        data = await response.json().catch(() => ({}));
      }

      const rawMessage = String(data.message || '').toLowerCase();
      const isSuccess =
        response &&
        response.ok &&
        (data.success === true ||
          data.success === 'true' ||
          data.ok === true ||
          Boolean(customFormspreeUrl && response.status === 200));

      if (isSuccess) {
        setSubmitStatus('success');
        setStatusMessage(
          `Message delivered to ${destinationEmail}. Thank you, ${payload.name} — I will get back to you soon!`
        );
        // Clear fields only on verified success
        setFormData({
          name: '',
          email: '',
          subject: INQUIRY_TOPICS[0],
          message: '',
          honeypot: '',
        });
        setErrors({});
      } else if (
        rawMessage.includes('activate') ||
        rawMessage.includes('confirm') ||
        rawMessage.includes('activation')
      ) {
        // FormSubmit requires one-time activation in the owner's Gmail inbox
        setSubmitStatus('activation_needed');
        setStatusMessage(
          `FormSubmit sent a one-time activation email to ${destinationEmail}. Until activated, you can send your exact message immediately via the Direct Gmail button below (your message is preserved).`
        );
      } else {
        throw new Error(
          data.message || 'The email relay could not complete the request.'
        );
      }
    } catch {
      // Honest failure state — never fake success and never erase the user's message
      setSubmitStatus('error');
      setStatusMessage(
        `Could not reach the automated mail relay right now. Your message is safely preserved above — click "Send via Email Client" below to deliver it directly to ${destinationEmail}.`
      );
    }
  };

  return (
    <section id="contact" className="scroll-section contact-scroll-section">
      {/* Peaceful Final Scroll Artwork: Sansui-ga Ink-Wash Mountains & Sun/Moon */}
      <div className="contact-landscape-backdrop" aria-hidden="true">
        <div
          className={`contact-celestial-orb ${
            isNight ? 'contact-moon' : 'contact-sun'
          }`}
        />

        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="contact-mountains-svg"
        >
          <defs>
            <linearGradient id="contactMtFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-far)" stopOpacity="0.65" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="contactMtMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--mountain-mid)" stopOpacity="0.78" />
              <stop offset="100%" stopColor="var(--bg-canvas)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <path
            d="M0,245 C140,195 235,115 350,118 C465,121 545,210 675,195 C805,180 890,82 1015,86 C1140,90 1265,195 1440,215 L1440,320 L0,320 Z"
            fill="url(#contactMtFar)"
          />
          <path
            d="M0,285 C260,215 540,275 860,205 C1110,152 1295,235 1440,225 L1440,320 L0,320 Z"
            fill="url(#contactMtMid)"
          />
        </svg>
      </div>

      <div className="scroll-container contact-scroll-wrapper">
        <div className="final-scroll-panel">
          <div className="contact-header-block">
            <span className="section-scroll-tag">Final Scroll • 縁 • Contact</span>

            <h2 className="contact-invitation-heading">
              Let’s Build Something Together.
            </h2>

            <p className="contact-invitation-sub">
              Whether you are looking to collaborate on embedded hardware, ESP32 sensor
              networks, cross-platform mobile software, or Computer Engineering projects,
              send a message directly to my Gmail inbox or reach out via the channels below.
            </p>
          </div>

          <div className="ink-brush-divider centered-brush" aria-hidden="true" />

          {/* Two-Column Siddz-Inspired Layout: Left Working Form | Right Direct Channels */}
          <div className="contact-siddz-layout">
            {/* LEFT COLUMN: Working Contact Form */}
            <div className="contact-form-panel">
              <div className="contact-form-header">
                <div className="contact-form-title-row">
                  <span className="contact-seal-icon">信</span>
                  <div>
                    <h3 className="contact-panel-title">Direct Dispatch Form</h3>
                    <p className="contact-panel-subtitle">
                      Delivers straight to{' '}
                      <span className="ruby-highlight-text">{destinationEmail}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Topic Pills */}
              <div
                className="contact-topic-selector"
                role="group"
                aria-label="Quick select inquiry topic"
              >
                <span className="topic-selector-label">Quick Topic:</span>
                <div className="topic-pills-row">
                  {INQUIRY_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => handleTopicSelect(topic)}
                      className={`topic-pill-btn ${
                        formData.subject === topic ? 'topic-active' : ''
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <form
                className="sumi-contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Hidden Honeypot Input for Anti-Spam */}
                <div className="sr-only-live" aria-hidden="true">
                  <label htmlFor="contact-honeypot">
                    Do not fill this out if you are human
                  </label>
                  <input
                    id="contact-honeypot"
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-row-two-col">
                  <div className="form-field-group">
                    <label htmlFor="contact-name" className="form-field-label">
                      Your Name <span className="ruby-required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="e.g. Monkey D. Luffy"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={submitStatus === 'submitting'}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'error-contact-name' : undefined}
                      className={`sumi-form-input ${errors.name ? 'input-error' : ''}`}
                    />
                    {errors.name && (
                      <span id="error-contact-name" className="form-error-text" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-email" className="form-field-label">
                      Your Email <span className="ruby-required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={submitStatus === 'submitting'}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-contact-email' : undefined}
                      className={`sumi-form-input ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && (
                      <span id="error-contact-email" className="form-error-text" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-subject" className="form-field-label">
                    Subject <span className="ruby-required">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="What are we building together?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    disabled={submitStatus === 'submitting'}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? 'error-contact-subject' : undefined}
                    className={`sumi-form-input ${errors.subject ? 'input-error' : ''}`}
                  />
                  {errors.subject && (
                    <span id="error-contact-subject" className="form-error-text" role="alert">
                      {errors.subject}
                    </span>
                  )}
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message" className="form-field-label">
                    Message <span className="ruby-required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, embedded system idea, timeline, or question..."
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={submitStatus === 'submitting'}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-contact-message' : undefined}
                    className={`sumi-form-textarea ${errors.message ? 'input-error' : ''}`}
                  />
                  {errors.message && (
                    <span id="error-contact-message" className="form-error-text" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Status Feedback Banner */}
                {submitStatus === 'success' && (
                  <div className="form-status-banner status-success" role="status">
                    <CheckCircle2 size={18} className="status-banner-icon" />
                    <div className="status-banner-content">
                      <strong>Dispatch Confirmed!</strong>
                      <p>{statusMessage}</p>
                    </div>
                  </div>
                )}

                {(submitStatus === 'error' || submitStatus === 'activation_needed') && (
                  <div className="form-status-banner status-error" role="alert">
                    <AlertCircle size={18} className="status-banner-icon" />
                    <div className="status-banner-content">
                      <strong>
                        {submitStatus === 'activation_needed'
                          ? 'One-Time Inbox Activation Pending'
                          : 'Direct Relay Fallback Ready'}
                      </strong>
                      <p>{statusMessage}</p>
                      <div className="status-fallback-actions">
                        <a href={buildMailtoHref()} className="btn-sumi-primary btn-xs">
                          <Mail size={13} /> Send via Email Client (Pre-filled)
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyEmail}
                          className="btn-sumi-secondary btn-xs"
                        >
                          {copyState === 'copied' ? <Check size={13} /> : <Copy size={13} />}
                          <span>
                            {copyState === 'copied' ? 'Email Copied!' : 'Copy Gmail Address'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-submit-row">
                  <button
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="btn-sumi-primary form-submit-btn"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <Loader2 size={17} className="spin-icon" />
                        <span>Sending Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message to Gmail</span>
                      </>
                    )}
                  </button>

                  <a
                    href={buildMailtoHref()}
                    className="btn-sumi-secondary form-mailto-fallback"
                    title={`Open your default email app addressed to ${destinationEmail}`}
                  >
                    <Mail size={15} />
                    <span>Open in Mail App</span>
                  </a>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: Direct Contact Cards & Verified Channels */}
            <div className="contact-channels-column">
              {/* Primary Direct Email Card */}
              <div className="contact-scroll-card contact-card-featured">
                <div className="contact-card-top">
                  <span className="contact-seal-icon seal-ruby">郵</span>
                  <Sparkles size={16} className="contact-ext-icon" />
                </div>
                <h3 className="contact-channel-label">Direct Gmail Inbox</h3>
                <a
                  href={buildMailtoHref()}
                  className="contact-channel-value contact-email-link"
                >
                  {destinationEmail}
                </a>
                <p className="contact-channel-hint">
                  Prefer your own mail client? Click to compose with your subject or copy my
                  address to your clipboard.
                </p>
                <div className="contact-email-actions">
                  <a href={buildMailtoHref()} className="btn-sumi-primary btn-xs">
                    <Mail size={13} /> Direct Mailto
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`btn-sumi-secondary btn-xs ${
                      copyState === 'copied' ? 'copy-success-btn' : ''
                    }`}
                    aria-live="polite"
                  >
                    {copyState === 'copied' ? <Check size={13} /> : <Copy size={13} />}
                    <span>
                      {copyState === 'copied'
                        ? 'Copied to Clipboard!'
                        : copyState === 'error'
                        ? 'Copy Failed — Select Above'
                        : 'Copy Email'}
                    </span>
                  </button>
                </div>
              </div>

              {/* GitHub Profile Card */}
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="contact-scroll-card"
              >
                <div className="contact-card-top">
                  <span className="contact-seal-icon">源</span>
                  <ExternalLink size={16} className="contact-ext-icon" />
                </div>
                <h3 className="contact-channel-label">GitHub Engineering Ledger</h3>
                <p className="contact-channel-value">
                  <Code2 size={15} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px' }} />
                  github.com/{PERSONAL_INFO.githubUsername}
                </p>
                <span className="contact-channel-hint">
                  Inspect open-source repositories, ERecPass Mobile &amp; embedded code
                </span>
              </a>

              {/* Academic & Hardware Lab Base Card */}
              <div className="contact-scroll-card">
                <div className="contact-card-top">
                  <span className="contact-seal-icon">処</span>
                  <MapPin size={16} className="contact-ext-icon" />
                </div>
                <h3 className="contact-channel-label">Academic &amp; Lab Base</h3>
                <p className="contact-channel-value">
                  {PERSONAL_INFO.school} • {PERSONAL_INFO.location}
                </p>
                <span className="contact-channel-hint">
                  {PERSONAL_INFO.degree} ({PERSONAL_INFO.yearLevel})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
