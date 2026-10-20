# Gear 5 Transformation Audio Asset

This folder is configured to host the sound effect for the Gear 5 transformation triggered when switching to Night Mode.

## Custom Audio File
- **Target File**: `gear5-transformation.mp3`
- **Path**: `public/audio/gear5-transformation.mp3`
- **Supported Formats**: `.mp3`, `.wav`, `.ogg` (standard web audio)

## Built-In Fallback
If `gear5-transformation.mp3` is not provided, the portfolio automatically utilizes a synthesized Web Audio API sound effect (Liberation Taiko drum pulse + rising cartoon spring chime + celestial cloud shimmer), ensuring zero console errors and an immediate working experience.

To use your own sound file, simply place your MP3 named `gear5-transformation.mp3` directly into this directory (`public/audio/gear5-transformation.mp3`).
