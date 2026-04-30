# Fretboard Engine

Fretboard Engine is a plain HTML, CSS, and JavaScript guitar practice app centered on a fretboard visualizer. The current build is a working prototype focused on getting the core layout and music-theory workflows right before adding audio, persistence, or advanced practice tools.

## Current Scope

- Static browser app with no build step.
- Fretboard-first interface.
- Standard tuning: E A D G B E.
- 12, 15, and 24 fret display options.
- Left-nav driven workflows.

## Implemented Workflows

### Scales

- Select a key.
- Select a mode.
- Toggle note names and intervals.
- Show scale tones across the fretboard.
- Open string labels follow the same root/scale colors as the fretboard notes.
- Text summary above the fretboard shows harmonized scale chords using roman numerals.

### Chords

- Select a key.
- Select chord type: Triads or 7th Chords.
- Select chord quality.
- Show chord positions across the neck.
- Open string labels follow the same root/chord colors as the fretboard notes.
- Text summary above the fretboard shows chord intervals and chord tones.

### Progressions

- Select a key.
- Choose `Make my own` or `Use Common`.
- `Make my own`: assign chord order from the key's diatonic chords.
- `Use Common`: select a common chord progression.
- Press `Show` to populate the Progression Sequencer.
- Selecting a sequencer chord shows that chord across the fretboard.

## Project Files

- `index.html`: App shell and UI structure.
- `styles.css`: Visual design, layout, fretboard styling, responsive behavior.
- `app.js`: Music theory data, fretboard rendering, workflow state, progression logic.

## Design Direction

The chosen style is a compact pro-audio utility layout with a clean maple fretboard. The fretboard should remain readable and functional over decorative styling.

Current note colors:

- Root: coral/red.
- Chord tone: blue.
- Scale tone: blue to match current fretboard note styling.
- Fret marker: neutral gray/black.

## Important Product Decisions

- Scales and Chords are considered stable for now.
- Do not change Scales or Chords behavior while working on Progressions unless explicitly requested.
- The left nav determines which controls appear.
- The Progression Sequencer should only appear when `Progressions` is selected.
- Open string labels are not extra frets; they represent fret 0 and should only be colored when they belong to the active scale/chord/progression chord.

## Next Roadmap

1. Refine Progressions workflow and custom progression editing.
2. Add reusable chord/progression presets.
3. Add alternate tunings.
4. Add capo support.
5. Add practice exercises.
6. Add optional audio playback/metronome later.
7. Add local storage for user preferences and saved progressions.

## Running

Open `index.html` directly in a browser.

No package install, framework, or bundler is required.

For a local server with no third-party dependencies:

```sh
npm start
```

Then open `http://localhost:4173`.

## Project Commands

- `npm start`: serve the static app locally with Node's built-in HTTP module.
- `npm run check`: syntax-check the JavaScript files.
