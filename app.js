const NOTES_SHARP = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const NOTE_TO_PC = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11
};
const NATURAL_NOTE_PCS = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11
};
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

const MODES = {
  Ionian: [0, 2, 4, 5, 7, 9, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
  Phrygian: [0, 1, 3, 5, 7, 8, 10],
  Lydian: [0, 2, 4, 6, 7, 9, 11],
  Mixolydian: [0, 2, 4, 5, 7, 9, 10],
  Aeolian: [0, 2, 3, 5, 7, 8, 10],
  Locrian: [0, 1, 3, 5, 6, 8, 10],
  "Major Pentatonic": [0, 2, 4, 7, 9],
  "Minor Pentatonic": [0, 3, 5, 7, 10],
  Blues: [0, 3, 5, 6, 7, 10]
};

const SCALE_THEORY = {
  Ionian: {
    source: "Ionian is the major scale. It is the reference point for comparing most other scales and modes.",
    sound: "Stable, bright, and resolved. It fits major-key melodies, I-IV-V progressions, and major triads or maj7 chords.",
    practice: "Resolve phrases to the root and 3rd, then connect the major chord tones before filling in passing scale tones.",
    parentOffset: 0,
    parentMode: "1st mode"
  },
  Dorian: {
    source: "Dorian is a minor mode with a natural 6. Compared with natural minor, that raised 6 gives it a smoother, funkier lift.",
    sound: "Minor, but less dark than Aeolian. It works well over minor 7 chords, ii-V ideas, funk vamps, and modal rock grooves.",
    practice: "Target the b3 and natural 6 so your ear hears Dorian instead of plain natural minor.",
    parentOffset: 2,
    parentMode: "2nd mode"
  },
  Phrygian: {
    source: "Phrygian is a minor mode with a b2. The half step above the root is the sound that defines it.",
    sound: "Dark, tense, and Spanish-leaning. It works over minor chords when the b2 is part of the desired color.",
    practice: "Lean into the root-to-b2 movement, then resolve back to the root so the tension sounds intentional.",
    parentOffset: 4,
    parentMode: "3rd mode"
  },
  Lydian: {
    source: "Lydian is a major mode with a #4. Compared with Ionian, the raised 4 removes the strong pull back down to the 3rd.",
    sound: "Open, floating, and bright. It works well over maj7 and maj7#11 sounds when you want a less settled major color.",
    practice: "Highlight the #4 against the root, then resolve to the 5th or 3rd to hear the Lydian color clearly.",
    parentOffset: 5,
    parentMode: "4th mode"
  },
  Mixolydian: {
    source: "Mixolydian is a major mode with a b7. Compared with the major scale, lowering the 7th creates a dominant sound.",
    sound: "Major, bluesy, and unresolved. It fits dominant 7 chords, rock riffs, country lines, and I-bVII-IV progressions.",
    practice: "Target the 3rd and b7 together; that pair outlines the dominant 7 sound better than running the scale up and down.",
    parentOffset: 7,
    parentMode: "5th mode"
  },
  Aeolian: {
    source: "Aeolian is the natural minor scale. It is the 6th mode of major and the basic sound of minor-key harmony.",
    sound: "Dark, familiar, and resolved as minor. It fits minor progressions, minor triads, and min7 chords.",
    practice: "Resolve phrases to the root and b3, then compare the b6 against Dorian's natural 6.",
    parentOffset: 9,
    parentMode: "6th mode"
  },
  Locrian: {
    source: "Locrian is a diminished mode with a b2 and b5. The unstable b5 makes the tonic chord feel unresolved.",
    sound: "Tense and unstable. It is most useful over m7b5 chords, especially in minor ii-V progressions.",
    practice: "Outline the root, b3, b5, and b7 first, then add the b2 as color rather than treating it like a resting note.",
    parentOffset: 11,
    parentMode: "7th mode"
  },
  "Major Pentatonic": {
    source: "Major pentatonic is the major scale with the 4th and 7th removed. Removing those half-step tensions makes it easy to phrase cleanly.",
    sound: "Clear, melodic, and consonant. It fits major chords, country lines, pop melodies, and major-key improvising.",
    practice: "Connect the root, 2, 3, 5, and 6 around nearby major chord shapes instead of treating it as one box.",
    parentOffset: null,
    parentMode: "major scale without 4 and 7"
  },
  "Minor Pentatonic": {
    source: "Minor pentatonic is the natural minor scale with the 2nd and b6 removed. It keeps the strongest minor colors and avoids the softer tensions.",
    sound: "Direct, bluesy, and guitar-friendly. It works over minor chords and is often used over blues and rock progressions.",
    practice: "Find the root in each box, then bend or slide toward chord tones so the pattern becomes phrasing.",
    parentOffset: null,
    parentMode: "natural minor without 2 and b6"
  },
  Blues: {
    source: "The blues scale is minor pentatonic plus the b5, often called the blue note. That added note creates tension between the 4th and 5th.",
    sound: "Gritty, tense, and expressive. It works in blues, rock, funk, and many dominant or minor groove settings.",
    practice: "Use the b5 as a passing tone between 4 and 5; let it create motion instead of landing on it every time.",
    parentOffset: null,
    parentMode: "minor pentatonic plus b5"
  }
};

const CHORD_QUALITIES = {
  triad: {
    Major: [0, 4, 7],
    Minor: [0, 3, 7],
    Diminished: [0, 3, 6],
    Augmented: [0, 4, 8],
    Sus2: [0, 2, 7],
    Sus4: [0, 5, 7]
  },
  seventh: {
    Maj7: [0, 4, 7, 11],
    Dom7: [0, 4, 7, 10],
    Min7: [0, 3, 7, 10],
    MinMaj7: [0, 3, 7, 11],
    HalfDim7: [0, 3, 6, 10],
    Dim7: [0, 3, 6, 9],
    Min7b5: [0, 3, 6, 10],
    AugMaj7: [0, 4, 8, 11]
  }
};

const CHORD_THEORY = {
  Major: {
    structure: "Major triad: root, major 3rd, perfect 5th.",
    sound: "Stable, bright, and resolved. It is the basic major chord sound.",
    practice: "Find each inversion and listen for the major 3rd because it defines the chord quality."
  },
  Minor: {
    structure: "Minor triad: root, minor 3rd, perfect 5th.",
    sound: "Stable but darker than major. It is the basic minor chord sound.",
    practice: "Target the b3 first, then connect it to the root and 5th in each inversion."
  },
  Diminished: {
    structure: "Diminished triad: root, minor 3rd, diminished 5th.",
    sound: "Tense and unstable because the b5 wants to resolve.",
    practice: "Treat the b5 as the color note and practice resolving it down to 4 or up to 5."
  },
  Augmented: {
    structure: "Augmented triad: root, major 3rd, augmented 5th.",
    sound: "Bright, tense, and floating because the raised 5th avoids a settled major sound.",
    practice: "Compare the #5 against a normal 5th so the augmented color is easy to hear."
  },
  Sus2: {
    structure: "Suspended 2 triad: root, 2nd, perfect 5th.",
    sound: "Open and unresolved because the 3rd is replaced by the 2nd.",
    practice: "Resolve the 2nd up to the 3rd to hear how the suspended sound becomes major."
  },
  Sus4: {
    structure: "Suspended 4 triad: root, 4th, perfect 5th.",
    sound: "Open and expectant because the 3rd is replaced by the 4th.",
    practice: "Resolve the 4th down to the 3rd to hear the classic sus4 release."
  },
  Maj7: {
    structure: "Major 7 chord: major triad plus major 7th.",
    sound: "Smooth, bright, and sophisticated. Common in jazz, soul, pop, and major-key harmony.",
    practice: "Learn where the 7th sits in each shape and resolve it gently to the root."
  },
  Dom7: {
    structure: "Dominant 7 chord: major triad plus b7.",
    sound: "Bluesy and directional. The 3rd and b7 create the dominant pull.",
    practice: "Focus on the 3rd and b7 pair; that interval defines the dominant 7 sound."
  },
  Min7: {
    structure: "Minor 7 chord: minor triad plus b7.",
    sound: "Warm, dark, and relaxed. Common in minor harmony, funk, soul, and ii-V progressions.",
    practice: "Connect the b3 and b7 across nearby shapes before adding passing tones."
  },
  MinMaj7: {
    structure: "Minor major 7 chord: minor triad plus major 7th.",
    sound: "Dark and cinematic because it combines a minor 3rd with a leading-tone 7th.",
    practice: "Hear the half-step pull from the 7th to the root while keeping the b3 clear."
  },
  HalfDim7: {
    structure: "Half-diminished 7 chord: diminished triad plus b7.",
    sound: "Tense but less compressed than fully diminished. Often functions as ii in minor keys.",
    practice: "Outline root, b3, b5, and b7 slowly so the b5 does not disappear in the shape."
  },
  Dim7: {
    structure: "Diminished 7 chord: diminished triad plus diminished 7th.",
    sound: "Very tense and symmetrical. It creates strong passing and leading-tone motion.",
    practice: "Move the same shape in minor thirds to see the chord's symmetry on the neck."
  },
  Min7b5: {
    structure: "Minor 7 flat 5 chord: root, b3, b5, b7.",
    sound: "Tense and minor-colored. It is another common name for half-diminished 7.",
    practice: "Compare it with Min7 by lowering only the 5th so the b5 color stands out."
  },
  AugMaj7: {
    structure: "Augmented major 7 chord: augmented triad plus major 7th.",
    sound: "Bright, unresolved, and modern because the #5 and 7 both create upward pull.",
    practice: "Isolate the #5 and 7 against the root before practicing full voicings."
  }
};

const SEQUENCES = {
  "I - bVII - IV": ["I", "bVII", "IV"],
  "I - V - vi - IV": ["I", "V", "vi", "IV"],
  "ii - V - I": ["ii", "V", "I"],
  "i - IV - VII": ["i", "IV", "VII"],
  "I - vi - IV - V": ["I", "vi", "IV", "V"],
  "I - IV - V": ["I", "IV", "V"]
};

const IONIAN_TRIAD_QUALITIES = ["Major", "Minor", "Minor", "Major", "Major", "Minor", "Diminished"];
const IONIAN_ROMANS = ["I", "ii", "iii", "IV", "V", "vi", "viidim"];

const ROMAN_DEGREES = {
  I: 0,
  i: 0,
  ii: 2,
  II: 2,
  iii: 4,
  III: 4,
  IV: 5,
  iv: 5,
  V: 7,
  v: 7,
  vi: 9,
  VI: 9,
  VII: 11,
  vii: 11,
  bVII: 10,
  bIII: 3,
  bVI: 8
};

const INTERVAL_LABELS = {
  0: "1",
  1: "b2",
  2: "2",
  3: "b3",
  4: "3",
  5: "4",
  6: "b5",
  7: "5",
  8: "b6",
  9: "6",
  10: "b7",
  11: "7",
  14: "9"
};
const SCALE_DEGREES = {
  Ionian: [1, 2, 3, 4, 5, 6, 7],
  Dorian: [1, 2, 3, 4, 5, 6, 7],
  Phrygian: [1, 2, 3, 4, 5, 6, 7],
  Lydian: [1, 2, 3, 4, 5, 6, 7],
  Mixolydian: [1, 2, 3, 4, 5, 6, 7],
  Aeolian: [1, 2, 3, 4, 5, 6, 7],
  Locrian: [1, 2, 3, 4, 5, 6, 7],
  "Major Pentatonic": [1, 2, 3, 5, 6],
  "Minor Pentatonic": [1, 3, 4, 5, 7],
  Blues: [1, 3, 4, 5, 5, 7]
};
const CHORD_INTERVAL_DEGREES = {
  0: 1,
  2: 2,
  3: 3,
  4: 3,
  5: 4,
  6: 5,
  7: 5,
  8: 5,
  9: 7,
  10: 7,
  11: 7
};

const FUNCTIONS = ["Tonic", "Supertonic", "Mediant", "Subdominant", "Dominant", "Submediant", "Leading Tone"];
const TUNING = ["E", "B", "G", "D", "A", "E"];
const STRING_OPEN_MIDI = [64, 59, 55, 50, 45, 40];
const MARKER_FRETS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

const els = {
  topbar: document.querySelector("#topbar"),
  keyControl: document.querySelector("#keyControl"),
  keySelect: document.querySelector("#keySelect"),
  modeControl: document.querySelector("#modeControl"),
  modeSelect: document.querySelector("#modeSelect"),
  scaleStringControl: document.querySelector("#scaleStringControl"),
  scaleStringCheckboxes: Array.from(document.querySelectorAll(".scale-string-checkbox")),
  chordTypeControl: document.querySelector("#chordTypeControl"),
  chordTypeSelect: document.querySelector("#chordTypeSelect"),
  chordControl: document.querySelector("#chordControl"),
  chordSelect: document.querySelector("#chordSelect"),
  chordButtonControls: document.querySelector("#chordButtonControls"),
  chordKeyButtons: document.querySelector("#chordKeyButtons"),
  chordTypeButtons: document.querySelector("#chordTypeButtons"),
  chordQualityButtons: document.querySelector("#chordQualityButtons"),
  chordStringControl: document.querySelector("#chordStringControl"),
  chordStringCheckboxes: Array.from(document.querySelectorAll(".chord-string-checkbox")),
  chordDisplayControl: document.querySelector("#chordDisplayControl"),
  showChordTheory: document.querySelector("#showChordTheory"),
  scaleDisplayControl: document.querySelector("#scaleDisplayControl"),
  showNoteNames: document.querySelector("#showNoteNames"),
  showIntervalsTop: document.querySelector("#showIntervalsTop"),
  showTheory: document.querySelector("#showTheory"),
  showButton: document.querySelector("#showButton"),
  sequenceControl: document.querySelector("#sequenceControl"),
  sequenceSelect: document.querySelector("#sequenceSelect"),
  progressionSourceControl: document.querySelector("#progressionSourceControl"),
  progressionSourceSelect: document.querySelector("#progressionSourceSelect"),
  customProgressionBuilder: document.querySelector("#customProgressionBuilder"),
  sequencerPanel: document.querySelector("#sequencerPanel"),
  fretCountSelect: document.querySelector("#fretCountSelect"),
  showScale: document.querySelector("#showScale"),
  showChord: document.querySelector("#showChord"),
  showIntervals: document.querySelector("#showIntervals"),
  fretboard: document.querySelector("#fretboard"),
  fretNumbers: document.querySelector("#fretNumbers"),
  stringLabels: document.querySelector("#stringLabels"),
  noteSummary: document.querySelector("#noteSummary"),
  legend: document.querySelector("#legend"),
  sequenceCards: document.querySelector("#sequenceCards"),
  intervalRows: document.querySelector("#intervalRows"),
  contextLabel: document.querySelector("#contextLabel")
};

const appState = {
  progressionChords: [],
  activeProgressionIndex: 0,
  progressionHasBeenShown: false
};

const CHORD_TYPE_LABELS = {
  triad: "Triads",
  seventh: "7th"
};

const CHORD_QUALITY_LABELS = {
  Major: "Major",
  Minor: "Minor",
  Diminished: "Dim",
  Augmented: "Aug",
  Sus2: "Sus2",
  Sus4: "Sus4",
  Maj7: "Maj7",
  Dom7: "Dom7",
  Min7: "Min7",
  MinMaj7: "MinMaj7",
  HalfDim7: "HalfDim7",
  Dim7: "Dim7",
  Min7b5: "Min7b5",
  AugMaj7: "AugMaj7"
};

function pcToNote(pc) {
  return NOTES_SHARP[((pc % 12) + 12) % 12];
}

function getRootLetter(noteName) {
  return noteName[0];
}

function getLetterForDegree(rootName, degree) {
  const rootIndex = LETTERS.indexOf(getRootLetter(rootName));
  return LETTERS[(rootIndex + degree - 1) % LETTERS.length];
}

function accidentalForOffset(offset) {
  if (offset === -2) return "bb";
  if (offset === -1) return "b";
  if (offset === 0) return "";
  if (offset === 1) return "#";
  if (offset === 2) return "##";
  return "";
}

function spellIntervalFromRoot(rootName, interval, degree) {
  const targetPc = normalizeInterval(NOTE_TO_PC[rootName] + interval);
  const targetLetter = getLetterForDegree(rootName, degree);
  let offset = normalizeInterval(targetPc - NATURAL_NOTE_PCS[targetLetter]);

  if (offset > 6) offset -= 12;

  return `${targetLetter}${accidentalForOffset(offset)}`;
}

function spellScale(rootName, scaleName) {
  return MODES[scaleName].map((interval, index) =>
    spellIntervalFromRoot(rootName, interval, SCALE_DEGREES[scaleName][index])
  );
}

function spellChord(rootName, chordIntervals) {
  return chordIntervals.map((interval) =>
    spellIntervalFromRoot(rootName, normalizeInterval(interval), CHORD_INTERVAL_DEGREES[normalizeInterval(interval)])
  );
}

function buildSpellingMap(pcs, names) {
  return new Map(pcs.map((pc, index) => [pc, names[index]]));
}

function normalizeInterval(interval) {
  return ((interval % 12) + 12) % 12;
}

function fillSelect(select, values, selectedValue) {
  select.innerHTML = values
    .map((value) => `<option value="${value}"${value === selectedValue ? " selected" : ""}>${value}</option>`)
    .join("");
}

function getDefaultChordQuality(chordType) {
  return chordType === "triad" ? "Major" : Object.keys(CHORD_QUALITIES[chordType])[0];
}

function syncChordQualityOptions() {
  const chordType = els.chordTypeSelect.value;
  const qualities = Object.keys(CHORD_QUALITIES[chordType]);
  const selectedQuality = qualities.includes(els.chordSelect.value)
    ? els.chordSelect.value
    : getDefaultChordQuality(chordType);

  fillSelect(els.chordSelect, qualities, selectedQuality);
}

function renderChordButtonControls() {
  els.chordKeyButtons.innerHTML = NOTES_SHARP.map(
    (note) =>
      `<button class="mini-button ${note === els.keySelect.value ? "active" : ""}" data-chord-key="${note}" type="button">${note}</button>`
  ).join("");

  els.chordTypeButtons.innerHTML = Object.keys(CHORD_QUALITIES)
    .map(
      (type) =>
        `<button class="mini-button ${type === els.chordTypeSelect.value ? "active" : ""}" data-chord-type="${type}" type="button">${CHORD_TYPE_LABELS[type]}</button>`
    )
    .join("");

  els.chordQualityButtons.innerHTML = Object.keys(CHORD_QUALITIES[els.chordTypeSelect.value])
    .map(
      (quality) =>
        `<button class="mini-button ${quality === els.chordSelect.value ? "active" : ""}" data-chord-quality="${quality}" type="button">${CHORD_QUALITY_LABELS[quality]}</button>`
    )
    .join("");
}

function init() {
  fillSelect(els.keySelect, NOTES_SHARP, "C");
  fillSelect(els.modeSelect, Object.keys(MODES), "Mixolydian");
  syncChordQualityOptions();
  fillSelect(els.sequenceSelect, Object.keys(SEQUENCES), "I - bVII - IV");

  els.chordTypeSelect.addEventListener("change", () => {
    syncChordQualityOptions();
    renderChordButtonControls();
    render();
  });
  els.chordSelect.addEventListener("change", () => {
    renderChordButtonControls();
    render();
  });

  els.chordButtonControls.addEventListener("click", (event) => {
    const keyButton = event.target.closest("[data-chord-key]");
    const typeButton = event.target.closest("[data-chord-type]");
    const qualityButton = event.target.closest("[data-chord-quality]");

    if (keyButton) {
      els.keySelect.value = keyButton.dataset.chordKey;
    }

    if (typeButton) {
      els.chordTypeSelect.value = typeButton.dataset.chordType;
      syncChordQualityOptions();
    }

    if (qualityButton) {
      els.chordSelect.value = qualityButton.dataset.chordQuality;
    }

    if (keyButton || typeButton || qualityButton) {
      renderChordButtonControls();
      render();
    }
  });

  els.showButton.addEventListener("click", () => {
    if (getActiveView() === "progressions") {
      updateProgressionFromControls();
    }
    render();
  });
  els.sequenceSelect.addEventListener("change", () => {
    if (getActiveView() === "progressions") {
      appState.progressionChords = [];
      appState.activeProgressionIndex = 0;
      appState.progressionHasBeenShown = false;
      render();
      return;
    }

    render();
  });
  els.progressionSourceSelect.addEventListener("change", () => {
    appState.progressionChords = [];
    appState.activeProgressionIndex = 0;
    appState.progressionHasBeenShown = false;

    updateHeaderControls("progressions");
    renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value], els.keySelect.value));
    render();
  });
  els.keySelect.addEventListener("change", () => {
    if (getActiveView() === "progressions") {
      appState.progressionChords = [];
      appState.activeProgressionIndex = 0;
      appState.progressionHasBeenShown = false;
      renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value], els.keySelect.value));
    }

    renderChordButtonControls();
    render();
  });
  els.showNoteNames.addEventListener("change", render);
  els.showIntervalsTop.addEventListener("change", render);
  els.showTheory.addEventListener("change", render);
  els.showChordTheory.addEventListener("change", render);

  [els.fretCountSelect, els.showScale, els.showChord, els.showIntervals].forEach(
    (element) => {
      element.addEventListener("change", render);
    }
  );

  els.chordStringCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", render);
  });

  els.scaleStringCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", render);
  });

  document.querySelectorAll(".rail-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".rail-item").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      updateHeaderControls(button.dataset.view);
      render();
    });
  });

  updateHeaderControls("scales");
  renderChordButtonControls();
  render();
}

function updateHeaderControls(view) {
  const isProgressions = view === "progressions";
  const isScales = view === "scales";
  const isChords = view === "chords";

  els.keyControl.classList.toggle("is-hidden", isChords);
  els.modeControl.classList.toggle("is-hidden", !isScales);
  els.scaleStringControl.classList.toggle("is-hidden", !isScales);
  els.chordTypeControl.classList.add("is-hidden");
  els.chordControl.classList.add("is-hidden");
  els.chordButtonControls.classList.toggle("is-hidden", !isChords);
  els.chordStringControl.classList.toggle("is-hidden", !isChords);
  els.chordDisplayControl.classList.toggle("is-hidden", !isChords);
  els.scaleDisplayControl.classList.toggle("is-hidden", !isScales);
  els.progressionSourceControl.classList.toggle("is-hidden", !isProgressions);
  els.sequenceControl.classList.toggle("is-hidden", !(isProgressions && els.progressionSourceSelect.value === "common"));
  els.customProgressionBuilder.classList.toggle("is-hidden", !(isProgressions && els.progressionSourceSelect.value === "custom"));
  els.sequencerPanel.classList.toggle("is-hidden", !isProgressions);
  els.showButton.classList.toggle("is-hidden", isChords);
  els.topbar.classList.toggle("progression-mode", isProgressions);
  els.topbar.classList.toggle("chord-mode", isChords);

  if (isScales) {
    els.showScale.checked = true;
    els.showChord.checked = false;
    els.showIntervals.checked = els.showIntervalsTop.checked;
  }

  if (isChords) {
    els.showScale.checked = false;
    els.showChord.checked = true;
    els.showIntervals.checked = false;
    renderChordButtonControls();
  }

  if (isProgressions) {
    els.showScale.checked = false;
    els.showChord.checked = true;
    els.showIntervals.checked = false;
    renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value], els.keySelect.value));
  }
}

function getState() {
  const keyPc = NOTE_TO_PC[els.keySelect.value];
  const activeView = getActiveView();
  const scaleIntervals = MODES[els.modeSelect.value];
  const chordType = els.chordTypeSelect.value;
  const selectedChordQuality = CHORD_QUALITIES[chordType][els.chordSelect.value]
    ? els.chordSelect.value
    : getDefaultChordQuality(chordType);
  const activeProgressionChord = getActiveProgressionChord();
  const chordIntervals =
    activeView === "progressions" && activeProgressionChord
      ? CHORD_QUALITIES.triad[activeProgressionChord.quality]
      : activeView === "progressions"
        ? []
      : CHORD_QUALITIES[chordType][selectedChordQuality];
  const chordRootPc = activeView === "progressions" && activeProgressionChord ? activeProgressionChord.rootPc : keyPc;
  const showIntervals = activeView === "scales" ? els.showIntervalsTop.checked : els.showIntervals.checked;
  const showNoteNames = activeView === "scales" ? els.showNoteNames.checked : true;
  const selectedScaleStrings = getSelectedScaleStrings();
  const selectedChordStrings = getSelectedChordStrings();
  const scalePcs = scaleIntervals.map((interval) => normalizeInterval(keyPc + interval));
  const chordPcs = chordIntervals.map((interval) => normalizeInterval(chordRootPc + interval));
  const scaleNoteNames = spellScale(els.keySelect.value, els.modeSelect.value);
  const chordRootName =
    activeView === "progressions" && activeProgressionChord ? activeProgressionChord.rootName : els.keySelect.value;
  const chordNoteNames = spellChord(chordRootName, chordIntervals);

  return {
    activeView,
    keyName: els.keySelect.value,
    keyPc,
    displayRootPc: chordRootPc,
    modeName: els.modeSelect.value,
    scaleName: els.modeSelect.value,
    chordType,
    chordName: activeView === "progressions" && activeProgressionChord ? activeProgressionChord.quality : selectedChordQuality,
    activeProgressionChord,
    sequenceName: els.sequenceSelect.value,
    fretCount: Number(els.fretCountSelect.value),
    showScale: activeView === "scales" || els.showScale.checked,
    showChord: activeView === "chords" || els.showChord.checked,
    showIntervals,
    showNoteNames,
    showTheory: activeView === "scales" && els.showTheory.checked,
    showChordTheory: activeView === "chords" && els.showChordTheory.checked,
    selectedScaleStrings,
    selectedChordStrings,
    scalePcs,
    chordPcs,
    scaleNoteNames,
    chordNoteNames,
    scaleSpellingMap: buildSpellingMap(scalePcs, scaleNoteNames),
    chordSpellingMap: buildSpellingMap(chordPcs, chordNoteNames),
    chordShapes:
      (activeView === "chords" || activeView === "progressions") && chordIntervals.length
        ? buildChordShapes(
            chordRootPc,
            chordIntervals,
            Number(els.fretCountSelect.value),
            activeView === "chords" ? selectedChordStrings : getAllStringIndexes()
          )
        : [],
    scaleIntervals,
    chordIntervals
  };
}

function getActiveView() {
  return document.querySelector(".rail-item.selected")?.dataset.view || "scales";
}

function getAllStringIndexes() {
  return TUNING.map((_, index) => index);
}

function getSelectedScaleStrings() {
  const selected = els.scaleStringCheckboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => Number(checkbox.value));

  return selected.length ? selected : getAllStringIndexes();
}

function getSelectedChordStrings() {
  const selected = els.chordStringCheckboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => Number(checkbox.value));

  return selected.length ? selected : getAllStringIndexes();
}

function getProgressionScaleChords(keyPc, keyName = pcToNote(keyPc)) {
  return MODES.Ionian.map((interval, index) => {
    const quality = IONIAN_TRIAD_QUALITIES[index];
    const rootName = spellIntervalFromRoot(keyName, interval, index + 1);
    return {
      degree: index + 1,
      roman: IONIAN_ROMANS[index],
      rootPc: normalizeInterval(keyPc + interval),
      rootName,
      name: `${rootName}${quality === "Major" ? "" : quality === "Minor" ? "m" : "dim"}`,
      quality
    };
  });
}

function updateProgressionFromControls() {
  const keyPc = NOTE_TO_PC[els.keySelect.value];
  const keyName = els.keySelect.value;

  appState.progressionChords =
    els.progressionSourceSelect.value === "common"
      ? buildCommonProgression(keyPc, keyName, SEQUENCES[els.sequenceSelect.value])
      : buildCustomProgression(keyPc);
  appState.activeProgressionIndex = 0;
  appState.progressionHasBeenShown = true;
}

function buildCommonProgression(keyPc, keyName, romans) {
  return romans.map((roman) => {
    const rootPc = normalizeInterval(keyPc + (ROMAN_DEGREES[roman] ?? 0));
    const lowerRoman = roman.toLowerCase();
    const quality = lowerRoman.includes("dim") || lowerRoman.includes("vii") ? "Diminished" : roman === lowerRoman ? "Minor" : "Major";
    const rootName = spellIntervalFromRoot(keyName, ROMAN_DEGREES[roman] ?? 0, getRomanDegree(roman));

    return {
      roman,
      rootPc,
      quality,
      rootName,
      name: `${rootName}${quality === "Major" ? "" : quality === "Minor" ? "m" : "dim"}`
    };
  });
}

function getRomanDegree(roman) {
  const normalized = roman.replace(/^b/, "").replace(/dim$/i, "");
  const match = normalized.match(/[ivx]+/i)?.[0]?.toUpperCase();
  const degreeMap = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7 };
  return degreeMap[match] || 1;
}

function buildCustomProgression(keyPc) {
  const scaleChords = getProgressionScaleChords(keyPc, els.keySelect.value);
  const selected = [];

  els.customProgressionBuilder.querySelectorAll("select[data-degree]").forEach((select) => {
    const order = Number(select.value);
    if (!order) return;

    selected.push({
      order,
      chord: scaleChords[Number(select.dataset.degree) - 1]
    });
  });

  return selected
    .sort((a, b) => a.order - b.order)
    .map(({ chord }) => ({ ...chord }));
}

function getActiveProgressionChord() {
  if (!appState.progressionChords.length) {
    if (!appState.progressionHasBeenShown || els.progressionSourceSelect.value === "custom") {
      return null;
    }

    appState.progressionChords = buildCommonProgression(NOTE_TO_PC[els.keySelect.value], SEQUENCES[els.sequenceSelect.value]);
  }

  return appState.progressionChords[appState.activeProgressionIndex] || appState.progressionChords[0];
}

function renderCustomProgressionBuilder(scaleChords) {
  if (!els.customProgressionBuilder) return;

  const orderOptions = ["", "1", "2", "3", "4", "5", "6", "7", "8"]
    .map((value) => `<option value="${value}">${value || "-"}</option>`)
    .join("");

  els.customProgressionBuilder.innerHTML = `<span class="builder-title">Build progression</span>${scaleChords
    .map(
      (chord) => `<label class="builder-item">
        <span><strong>${chord.roman}</strong> ${chord.name}</span>
        <select data-degree="${chord.degree}" aria-label="${chord.name} order">${orderOptions}</select>
      </label>`
    )
    .join("")}`;
}

function render() {
  const state = getState();
  renderStringLabels(state);
  renderNoteSummary(state);
  renderFretboard(state);
  renderFretNumbers(state);
  renderLegend(state);
  renderSequence(state);
  renderTables(state);
}

function renderNoteSummary(state) {
  if (state.activeView === "progressions") {
    const chord = state.activeProgressionChord;
    if (!chord) {
      els.noteSummary.innerHTML = `<div class="summary-text-title">Choose chord order, then Show</div>`;
      return;
    }

    const intervals = state.chordIntervals.map((interval) => {
      const normalized = normalizeInterval(interval);
      return INTERVAL_LABELS[interval] || INTERVAL_LABELS[normalized] || String(interval);
    });
    const notes = state.chordNoteNames;
    const title = `${chord.roman} ${chord.name}`;

    els.noteSummary.innerHTML = renderTextSummary(title, intervals, notes);
    return;
  }

  if (state.activeView === "chords") {
    const intervals = state.chordIntervals.map((interval) => {
      const normalized = normalizeInterval(interval);
      return INTERVAL_LABELS[interval] || INTERVAL_LABELS[normalized] || String(interval);
    });
    const notes = state.chordNoteNames;

    els.noteSummary.innerHTML =
      renderTextSummary(`${state.keyName} ${state.chordName}`, intervals, notes) + renderChordTheory(state);
    return;
  }

  if (state.scaleIntervals.length === 7) {
    const harmonized = buildDiatonicTriads(state.keyName, state.keyPc, state.scaleIntervals);
    els.noteSummary.innerHTML = renderTextSummary(
      `${state.keyName} ${state.scaleName}`,
      harmonized.map((chord) => chord.roman),
      harmonized.map((chord) => chord.name)
    ) + renderScaleTheory(state);
    return;
  }

  els.noteSummary.innerHTML = renderTextSummary(
    `${state.keyName} ${state.scaleName}`,
    state.scaleIntervals.map((interval) => INTERVAL_LABELS[interval] || String(interval)),
    state.scaleNoteNames
  ) + renderScaleTheory(state);
}

function renderTextSummary(title, topItems, bottomItems) {
  const top = topItems.map((item) => `<span>${item}</span>`).join("");
  const bottom = bottomItems.map((item) => `<span>${item}</span>`).join("");

  return `<div class="summary-text-title">${title}</div>
    <div class="summary-lines">
      <div class="summary-line summary-roman">${top}</div>
      <div class="summary-line summary-notes">${bottom}</div>
    </div>`;
}

function renderScaleTheory(state) {
  if (!state.showTheory) return "";

  const theory = SCALE_THEORY[state.scaleName];
  if (!theory) return "";

  const formula = state.scaleIntervals.map((interval) => INTERVAL_LABELS[interval] || String(interval)).join(" - ");
  const notes = state.scaleNoteNames.join(" - ");
  const source = getScaleSourceText(state, theory);

  return `<div class="scale-theory" aria-label="${state.keyName} ${state.scaleName} theory">
    <div class="theory-card">
      <span class="theory-label">Formula</span>
      <strong>${formula}</strong>
    </div>
    <div class="theory-card">
      <span class="theory-label">Notes</span>
      <strong>${notes}</strong>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Built From</span>
      <p>${source}</p>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Sound</span>
      <p>${theory.sound}</p>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Practice Focus</span>
      <p>${theory.practice}</p>
    </div>
  </div>`;
}

function renderChordTheory(state) {
  if (!state.showChordTheory) return "";

  const theory = CHORD_THEORY[state.chordName];
  if (!theory) return "";

  const formula = state.chordIntervals
    .map((interval) => INTERVAL_LABELS[interval] || INTERVAL_LABELS[normalizeInterval(interval)] || String(interval))
    .join(" - ");
  const notes = state.chordNoteNames.join(" - ");
  const chordTypeLabel = state.chordType === "triad" ? "Triad" : "7th Chord";

  return `<div class="scale-theory" aria-label="${state.keyName} ${state.chordName} theory">
    <div class="theory-card">
      <span class="theory-label">Formula</span>
      <strong>${formula}</strong>
    </div>
    <div class="theory-card">
      <span class="theory-label">Notes</span>
      <strong>${notes}</strong>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Built From</span>
      <p>${chordTypeLabel}. ${theory.structure}</p>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Sound</span>
      <p>${theory.sound}</p>
    </div>
    <div class="theory-card theory-card-wide">
      <span class="theory-label">Practice Focus</span>
      <p>${theory.practice}</p>
    </div>
  </div>`;
}

function getScaleSourceText(state, theory) {
  if (theory.parentOffset === null) {
    return `${state.keyName} ${state.scaleName} is ${theory.parentMode}. ${theory.source}`;
  }

  const parentMajor = spellIntervalFromRoot(state.keyName, normalizeInterval(-theory.parentOffset), getScaleParentDegree(theory.parentOffset));
  return `${state.keyName} ${state.scaleName} is the ${theory.parentMode} of ${parentMajor} major. ${theory.source}`;
}

function getScaleParentDegree(parentOffset) {
  const interval = normalizeInterval(-parentOffset);
  const degreeMap = { 0: 1, 1: 2, 3: 3, 5: 4, 7: 5, 8: 6, 10: 7 };
  return degreeMap[interval] || 1;
}

function buildDiatonicTriads(keyName, keyPc, scaleIntervals) {
  return scaleIntervals.map((rootInterval, degreeIndex) => {
    const rootPc = normalizeInterval(keyPc + rootInterval);
    const thirdInterval = normalizeInterval(scaleIntervals[(degreeIndex + 2) % 7] - rootInterval);
    const fifthInterval = normalizeInterval(scaleIntervals[(degreeIndex + 4) % 7] - rootInterval);
    const quality = getTriadQuality(thirdInterval, fifthInterval);
    const roman = formatRomanNumeral(degreeIndex, quality);

    return {
      roman,
      name: `${spellIntervalFromRoot(keyName, rootInterval, degreeIndex + 1)}${quality.suffix}`
    };
  });
}

function getTriadQuality(thirdInterval, fifthInterval) {
  if (thirdInterval === 4 && fifthInterval === 7) return { type: "major", suffix: "" };
  if (thirdInterval === 3 && fifthInterval === 7) return { type: "minor", suffix: "m" };
  if (thirdInterval === 3 && fifthInterval === 6) return { type: "diminished", suffix: "dim" };
  if (thirdInterval === 4 && fifthInterval === 8) return { type: "augmented", suffix: "aug" };
  return { type: "other", suffix: "" };
}

function formatRomanNumeral(degreeIndex, quality) {
  const majorRomans = ["I", "II", "III", "IV", "V", "VI", "VII"];
  const roman = quality.type === "minor" || quality.type === "diminished" ? majorRomans[degreeIndex].toLowerCase() : majorRomans[degreeIndex];

  return quality.type === "diminished" ? `${roman}dim` : quality.type === "augmented" ? `${roman}aug` : roman;
}

function renderStringLabels(state) {
  els.stringLabels.innerHTML = TUNING.map((note, stringIndex) => {
    const pc = NOTE_TO_PC[note];
    const isSelectedScaleString = state.activeView !== "scales" || state.selectedScaleStrings.includes(stringIndex);
    const isSelectedChordString = state.activeView !== "chords" || state.selectedChordStrings.includes(stringIndex);
    const isRoot = pc === state.displayRootPc;
    const isChord =
      (state.activeView === "chords" || state.activeView === "progressions") &&
      isSelectedChordString &&
      state.chordPcs.includes(pc);
    const isScale = state.activeView === "scales" && isSelectedScaleString && state.scalePcs.includes(pc);
    const role =
      isRoot && isSelectedChordString && isSelectedScaleString ? "root" : isChord ? "chord" : isScale ? "scale" : "";

    return `<div class="string-label ${role}">${note}</div>`;
  }).join("");
}

function renderFretboard(state) {
  const width = Math.max(1080, state.fretCount * 52);
  const height = 176;
  const topPad = 14;
  const stringGap = (height - topPad * 2) / (TUNING.length - 1);
  const fretWidth = width / state.fretCount;
  const elements = [];

  els.fretboard.style.minWidth = `${width}px`;
  els.fretboard.style.width = `${width}px`;

  TUNING.forEach((_, stringIndex) => {
    const y = topPad + stringIndex * stringGap;
    elements.push(`<div class="string-line" style="top:${y}px"></div>`);
  });

  for (let fret = 0; fret <= state.fretCount; fret += 1) {
    const x = fret * fretWidth;
    elements.push(`<div class="${fret === 0 ? "nut-line" : "fret-line"}" style="left:${x}px"></div>`);
  }

  MARKER_FRETS.filter((fret) => fret <= state.fretCount).forEach((fret) => {
    const x = (fret - 0.5) * fretWidth;
    if (fret === 12 || fret === 24) {
      elements.push(`<div class="fret-marker" style="left:${x}px; top:${topPad + stringGap * 2}px"></div>`);
      elements.push(`<div class="fret-marker" style="left:${x}px; top:${topPad + stringGap * 3}px"></div>`);
    } else {
      elements.push(`<div class="fret-marker" style="left:${x}px; top:${topPad + stringGap * 2.5}px"></div>`);
    }
  });

  if (state.activeView === "chords" || state.activeView === "progressions") {
    renderChordShapes(state, elements, topPad, stringGap, fretWidth);
    els.fretboard.innerHTML = elements.join("");
    return;
  }

  TUNING.forEach((openNote, stringIndex) => {
    if (state.activeView === "scales" && !state.selectedScaleStrings.includes(stringIndex)) return;

    const openPc = NOTE_TO_PC[openNote];
    for (let fret = 1; fret <= state.fretCount; fret += 1) {
      const pc = normalizeInterval(openPc + fret);
      const isRoot = pc === state.keyPc;
      const isChord = state.chordPcs.includes(pc);
      const isScale = state.scalePcs.includes(pc);
      const showAsChord = state.showChord && isChord;
      const showAsScale = state.showScale && isScale;
      const shouldShow = isRoot || showAsChord || showAsScale;

      if (!shouldShow) continue;

      const x = (fret - 0.5) * fretWidth;
      const y = topPad + stringIndex * stringGap;
      const intervalFromRoot = normalizeInterval(pc - state.keyPc);
      const noteLabel = state.showNoteNames ? state.scaleSpellingMap.get(pc) || pcToNote(pc) : "";
      const intervalLabel = state.showIntervals ? INTERVAL_LABELS[intervalFromRoot] || intervalFromRoot : "";
      const label = [noteLabel, intervalLabel].filter(Boolean).join("/");
      const role = isRoot ? "root" : showAsChord ? "chord" : "scale";

      elements.push(
        `<div class="note-dot ${role}" style="left:${x}px; top:${y}px" title="${state.scaleSpellingMap.get(pc) || pcToNote(pc)} fret ${fret}">${label}</div>`
      );
    }
  });

  els.fretboard.innerHTML = elements.join("");
}

function buildChordShapes(keyPc, chordIntervals, fretCount, stringIndexes = getAllStringIndexes()) {
  const chordPcs = chordIntervals.map((interval) => normalizeInterval(keyPc + interval));
  const notesNeeded = chordPcs.length;
  const stringGroups = [];
  const shapes = [];
  const seen = new Set();

  for (let start = 0; start <= stringIndexes.length - notesNeeded; start += 1) {
    stringGroups.push(Array.from({ length: notesNeeded }, (_, offset) => stringIndexes[start + offset]));
  }

  stringGroups.forEach((strings) => {
    const candidates = strings.map((stringIndex) => {
      const openMidi = STRING_OPEN_MIDI[stringIndex];
      const frets = [];

      for (let fret = 0; fret <= fretCount; fret += 1) {
        const midi = openMidi + fret;
        const notePc = normalizeInterval(midi);

        if (chordPcs.includes(notePc)) {
          frets.push({ stringIndex, fret, pc: notePc, midi });
        }
      }

      return frets;
    });

    combineShapeCandidates(candidates).forEach((notes) => {
      const uniquePcs = new Set(notes.map((note) => note.pc));
      const frets = notes.map((note) => note.fret);
      const fretSpan = Math.max(...frets) - Math.min(...frets);
      const renderedNotes = notes.filter((note) => note.fret > 0);
      const bassNote = notes.reduce((lowest, note) => (note.midi < lowest.midi ? note : lowest), notes[0]);
      const inversionIndex = chordPcs.indexOf(bassNote.pc);
      const shapeKey = notes
        .map((note) => `${note.stringIndex}:${note.fret}`)
        .sort()
        .join("|");

      if (
        uniquePcs.size !== notesNeeded ||
        fretSpan > 4 ||
        inversionIndex < 0 ||
        renderedNotes.length === 0 ||
        seen.has(shapeKey)
      ) {
        return;
      }

      seen.add(shapeKey);
      shapes.push({
        inversionIndex,
        minFret: Math.max(1, Math.min(...frets)),
        maxFret: Math.max(...frets),
        stringTop: Math.min(...notes.map((note) => note.stringIndex)),
        stringBottom: Math.max(...notes.map((note) => note.stringIndex)),
        notes
      });
    });
  });

  return shapes.sort((a, b) => a.minFret - b.minFret || a.stringTop - b.stringTop || a.inversionIndex - b.inversionIndex);
}

function combineShapeCandidates(candidateGroups, index = 0, current = [], result = []) {
  if (index === candidateGroups.length) {
    result.push([...current]);
    return result;
  }

  candidateGroups[index].forEach((candidate) => {
    current.push(candidate);
    combineShapeCandidates(candidateGroups, index + 1, current, result);
    current.pop();
  });

  return result;
}

function renderChordShapes(state, elements, topPad, stringGap, fretWidth) {
  state.chordShapes.forEach((shape) => {
    shape.notes.filter((note) => note.fret > 0).forEach((note) => {
      const x = (note.fret - 0.5) * fretWidth;
      const y = topPad + note.stringIndex * stringGap;
      const role = note.pc === state.displayRootPc ? "root" : "chord";

      elements.push(
        `<div class="note-dot ${role}" style="left:${x}px; top:${y}px" title="${state.chordSpellingMap.get(note.pc) || pcToNote(note.pc)} fret ${note.fret}">${state.chordSpellingMap.get(note.pc) || pcToNote(note.pc)}</div>`
      );
    });
  });
}

function renderFretNumbers(state) {
  const width = Math.max(1080, state.fretCount * 52);
  const fretWidth = width / state.fretCount;
  const usefulFrets = [1, 3, 5, 7, 9, 12, 15, 18, 19, 21, 24].filter((fret) => fret <= state.fretCount);
  const numbers = usefulFrets
    .map((fret) => `<span class="fret-number" style="left:${(fret - 0.5) * fretWidth}px">${fret}</span>`)
    .join("");

  els.fretNumbers.innerHTML = `<div class="fret-number-track" style="min-width:${width}px">${numbers}</div>`;
}

function renderLegend(state) {
  const items =
    state.activeView === "chords" || state.activeView === "progressions"
      ? [
          ["legend-root", "R", "Root"],
          ["legend-chord", "C", "Chord Tone"],
          ["legend-marker", "", "Fret Marker"]
        ]
      : [
    ["legend-root", "R", "Root"],
    ["legend-chord", "C", "Chord Tone"],
    ["legend-scale", "*", "Scale Tone"],
    ["legend-marker", "", "Fret Marker"]
        ];

  els.legend.innerHTML = items
    .map(
      ([className, symbol, label]) =>
        `<span class="legend-item"><span class="legend-swatch ${className}">${symbol}</span>${label}</span>`
    )
    .join("");
}

function renderSequence(state) {
  if (state.activeView === "progressions") {
    if (!state.activeProgressionChord) {
      els.sequenceCards.innerHTML = `<div class="sequence-empty">Select an order for one or more chords, then press Show.</div>`;
      return;
    }

    const progression = appState.progressionChords.length ? appState.progressionChords : [state.activeProgressionChord];
    const cards = progression
      .map((chord, index) => {
        return `<button class="sequence-card ${index === appState.activeProgressionIndex ? "active" : ""}" data-progression-index="${index}" type="button">
          <span class="index">${index + 1}</span>
          <span class="chord-name">${chord.name}</span>
          <span class="roman">${chord.roman}</span>
        </button>`;
      })
      .join("");

    els.sequenceCards.innerHTML = `${cards}<button class="add-card" aria-label="Add chord" type="button">+</button>`;
    els.sequenceCards.querySelectorAll("[data-progression-index]").forEach((button) => {
      button.addEventListener("click", () => {
        appState.activeProgressionIndex = Number(button.dataset.progressionIndex);
        render();
      });
    });
    return;
  }

  const romans = SEQUENCES[state.sequenceName];
  const cards = romans
    .map((roman, index) => {
      const rootPc = normalizeInterval(state.keyPc + ROMAN_DEGREES[roman]);
      const chordQuality = roman === roman.toLowerCase() ? "min" : state.chordName;
      const rootName = spellIntervalFromRoot(state.keyName, ROMAN_DEGREES[roman], getRomanDegree(roman));
      return `<article class="sequence-card ${index === 0 ? "active" : ""}">
        <span class="index">${index + 1}</span>
        <span class="chord-name">${rootName} ${chordQuality}</span>
        <span class="roman">${roman}</span>
      </article>`;
    })
    .join("");

  els.sequenceCards.innerHTML = `${cards}<button class="add-card" aria-label="Add chord">+</button>`;
}

function renderTables(state) {
  if (state.activeView === "progressions") {
    if (!state.activeProgressionChord) {
      els.contextLabel.textContent = "";
      els.intervalRows.innerHTML = "";
      return;
    }

    els.contextLabel.textContent = `(${state.activeProgressionChord.name})`;
    els.intervalRows.innerHTML = state.chordIntervals
      .map((interval, index) => {
        const normalized = normalizeInterval(interval);
        return `<tr>
          <td>${index + 1}</td>
          <td>${INTERVAL_LABELS[interval] || INTERVAL_LABELS[normalized] || interval}</td>
          <td>${state.chordNoteNames[index]}</td>
          <td>Chord Tone</td>
        </tr>`;
      })
      .join("");

    return;
  }

  const intervals = MODES[state.scaleName];

  els.contextLabel.textContent = `(${state.keyName} ${state.scaleName})`;
  els.intervalRows.innerHTML = intervals
    .map((interval, index) => {
      const note = state.scaleNoteNames[index];
      return `<tr>
        <td>${index + 1}</td>
        <td>${INTERVAL_LABELS[interval] || interval}</td>
        <td>${note}</td>
        <td>${FUNCTIONS[index] || "Color Tone"}</td>
      </tr>`;
    })
    .join("");

}

init();
