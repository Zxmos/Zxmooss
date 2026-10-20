# One Piece "To the Grand Line" & Gear 5 Audio Assets

This folder hosts the audio file played when switching from Light Mode (Day) to Dark Mode (Night / Gear 5).

## Primary Soundtrack Asset
- **Target File**: `one-piece-to-the-grand-line.mp3`
- **Full Path**: `public/audio/one-piece-to-the-grand-line.mp3`
- **Reference**: [MyInstants — One Piece: To the Grand Line](https://www.myinstants.com/en/instant/one-piece-to-the-grand-line-64347/)

## How to Supply Your Local Audio File
To avoid redistributing third-party copyrighted audio without authorization, download your authorized `.mp3` copy and save it directly as:

```
public/audio/one-piece-to-the-grand-line.mp3
```

## Built-In Fallback & Playback Controls
- If `one-piece-to-the-grand-line.mp3` (or `gear5-transformation.mp3`) is present in `public/audio/`, the portfolio automatically plays it at a comfortable volume (`0.55`) when you toggle into Dark Mode.
- If no `.mp3` file is present yet, the portfolio automatically plays an original, royalty-free Web Audio API adventure brass & taiko drum fanfare so the feature works out-of-the-box with zero console errors.
- Switching back to Light Mode smoothly fades out and stops the audio, and a dedicated **Stop** / **SFX On / Mute** control is always available in the top navigation bar.
