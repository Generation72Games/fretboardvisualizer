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
  chordTypeControl: document.querySelector("#chordTypeControl"),
  chordTypeSelect: document.querySelector("#chordTypeSelect"),
  chordControl: document.querySelector("#chordControl"),
  chordSelect: document.querySelector("#chordSelect"),
  scaleDisplayControl: document.querySelector("#scaleDisplayControl"),
  showNoteNames: document.querySelector("#showNoteNames"),
  showIntervalsTop: document.querySelector("#showIntervalsTop"),
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

function pcToNote(pc) {
  return NOTES_SHARP[((pc % 12) + 12) % 12];
}

function normalizeInterval(interval) {
  return ((interval % 12) + 12) % 12;
}

function fillSelect(select, values, selectedValue) {
  select.innerHTML = values
    .map((value) => `<option value="${value}"${value === selectedValue ? " selected" : ""}>${value}</option>`)
    .join("");
}

function init() {
  fillSelect(els.keySelect, NOTES_SHARP, "C");
  fillSelect(els.modeSelect, Object.keys(MODES), "Mixolydian");
  fillSelect(els.chordSelect, Object.keys(CHORD_QUALITIES.triad), "Major");
  fillSelect(els.sequenceSelect, Object.keys(SEQUENCES), "I - bVII - IV");

  els.chordTypeSelect.addEventListener("change", () => {
    const qualities = Object.keys(CHORD_QUALITIES[els.chordTypeSelect.value]);
    fillSelect(els.chordSelect, qualities, qualities[0]);
    render();
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
    renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value]));
    render();
  });
  els.keySelect.addEventListener("change", () => {
    if (getActiveView() === "progressions") {
      appState.progressionChords = [];
      appState.activeProgressionIndex = 0;
      appState.progressionHasBeenShown = false;
      renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value]));
      render();
    }
  });
  els.showNoteNames.addEventListener("change", render);
  els.showIntervalsTop.addEventListener("change", render);

  [els.fretCountSelect, els.showScale, els.showChord, els.showIntervals].forEach(
    (element) => {
      element.addEventListener("change", render);
    }
  );

  document.querySelectorAll(".rail-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".rail-item").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      updateHeaderControls(button.dataset.view);
      render();
    });
  });

  updateHeaderControls("scales");
  render();
}

function updateHeaderControls(view) {
  const isProgressions = view === "progressions";
  const isScales = view === "scales";
  const isChords = view === "chords";

  els.modeControl.classList.toggle("is-hidden", !isScales);
  els.chordTypeControl.classList.toggle("is-hidden", !isChords);
  els.chordControl.classList.toggle("is-hidden", !isChords);
  els.scaleDisplayControl.classList.toggle("is-hidden", !isScales);
  els.progressionSourceControl.classList.toggle("is-hidden", !isProgressions);
  els.sequenceControl.classList.toggle("is-hidden", !(isProgressions && els.progressionSourceSelect.value === "common"));
  els.customProgressionBuilder.classList.toggle("is-hidden", !(isProgressions && els.progressionSourceSelect.value === "custom"));
  els.sequencerPanel.classList.toggle("is-hidden", !isProgressions);
  els.topbar.classList.toggle("progression-mode", isProgressions);

  if (isScales) {
    els.showScale.checked = true;
    els.showChord.checked = false;
    els.showIntervals.checked = els.showIntervalsTop.checked;
  }

  if (isChords) {
    els.showScale.checked = false;
    els.showChord.checked = true;
    els.showIntervals.checked = false;
  }

  if (isProgressions) {
    els.showScale.checked = false;
    els.showChord.checked = true;
    els.showIntervals.checked = false;
    renderCustomProgressionBuilder(getProgressionScaleChords(NOTE_TO_PC[els.keySelect.value]));
  }
}

function getState() {
  const keyPc = NOTE_TO_PC[els.keySelect.value];
  const activeView = getActiveView();
  const scaleIntervals = MODES[els.modeSelect.value];
  const chordType = els.chordTypeSelect.value;
  const activeProgressionChord = getActiveProgressionChord();
  const chordIntervals =
    activeView === "progressions" && activeProgressionChord
      ? CHORD_QUALITIES.triad[activeProgressionChord.quality]
      : activeView === "progressions"
        ? []
      : CHORD_QUALITIES[chordType][els.chordSelect.value];
  const chordRootPc = activeView === "progressions" && activeProgressionChord ? activeProgressionChord.rootPc : keyPc;
  const showIntervals = activeView === "scales" ? els.showIntervalsTop.checked : els.showIntervals.checked;
  const showNoteNames = activeView === "scales" ? els.showNoteNames.checked : true;

  return {
    activeView,
    keyName: els.keySelect.value,
    keyPc,
    displayRootPc: chordRootPc,
    modeName: els.modeSelect.value,
    scaleName: els.modeSelect.value,
    chordType,
    chordName: activeView === "progressions" && activeProgressionChord ? activeProgressionChord.quality : els.chordSelect.value,
    activeProgressionChord,
    sequenceName: els.sequenceSelect.value,
    fretCount: Number(els.fretCountSelect.value),
    showScale: activeView === "scales" || els.showScale.checked,
    showChord: activeView === "chords" || els.showChord.checked,
    showIntervals,
    showNoteNames,
    scalePcs: scaleIntervals.map((interval) => normalizeInterval(keyPc + interval)),
    chordPcs: chordIntervals.map((interval) => normalizeInterval(chordRootPc + interval)),
    chordShapes:
      (activeView === "chords" || activeView === "progressions") && chordIntervals.length
        ? buildChordShapes(chordRootPc, chordIntervals, Number(els.fretCountSelect.value))
        : [],
    scaleIntervals,
    chordIntervals
  };
}

function getActiveView() {
  return document.querySelector(".rail-item.selected")?.dataset.view || "scales";
}

function getProgressionScaleChords(keyPc) {
  return MODES.Ionian.map((interval, index) => {
    const quality = IONIAN_TRIAD_QUALITIES[index];
    return {
      degree: index + 1,
      roman: IONIAN_ROMANS[index],
      rootPc: normalizeInterval(keyPc + interval),
      name: `${pcToNote(keyPc + interval)}${quality === "Major" ? "" : quality === "Minor" ? "m" : "dim"}`,
      quality
    };
  });
}

function updateProgressionFromControls() {
  const keyPc = NOTE_TO_PC[els.keySelect.value];

  appState.progressionChords =
    els.progressionSourceSelect.value === "common"
      ? buildCommonProgression(keyPc, SEQUENCES[els.sequenceSelect.value])
      : buildCustomProgression(keyPc);
  appState.activeProgressionIndex = 0;
  appState.progressionHasBeenShown = true;
}

function buildCommonProgression(keyPc, romans) {
  return romans.map((roman) => {
    const rootPc = normalizeInterval(keyPc + (ROMAN_DEGREES[roman] ?? 0));
    const lowerRoman = roman.toLowerCase();
    const quality = lowerRoman.includes("dim") || lowerRoman.includes("vii") ? "Diminished" : roman === lowerRoman ? "Minor" : "Major";

    return {
      roman,
      rootPc,
      quality,
      name: `${pcToNote(rootPc)}${quality === "Major" ? "" : quality === "Minor" ? "m" : "dim"}`
    };
  });
}

function buildCustomProgression(keyPc) {
  const scaleChords = getProgressionScaleChords(keyPc);
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
    const notes = state.chordIntervals.map((interval) => pcToNote(chord.rootPc + normalizeInterval(interval)));
    const title = `${chord.roman} ${chord.name}`;

    els.noteSummary.innerHTML = renderTextSummary(title, intervals, notes);
    return;
  }

  if (state.activeView === "chords") {
    const intervals = state.chordIntervals.map((interval) => {
      const normalized = normalizeInterval(interval);
      return INTERVAL_LABELS[interval] || INTERVAL_LABELS[normalized] || String(interval);
    });
    const notes = state.chordIntervals.map((interval) => pcToNote(state.keyPc + normalizeInterval(interval)));

    els.noteSummary.innerHTML = renderTextSummary(`${state.keyName} ${state.chordName}`, intervals, notes);
    return;
  }

  if (state.scaleIntervals.length === 7) {
    const harmonized = buildDiatonicTriads(state.keyPc, state.scaleIntervals);
    els.noteSummary.innerHTML = renderTextSummary(
      `${state.keyName} ${state.scaleName}`,
      harmonized.map((chord) => chord.roman),
      harmonized.map((chord) => chord.name)
    );
    return;
  }

  els.noteSummary.innerHTML = renderTextSummary(
    `${state.keyName} ${state.scaleName}`,
    state.scaleIntervals.map((interval) => INTERVAL_LABELS[interval] || String(interval)),
    state.scaleIntervals.map((interval) => pcToNote(state.keyPc + interval))
  );
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

function buildDiatonicTriads(keyPc, scaleIntervals) {
  return scaleIntervals.map((rootInterval, degreeIndex) => {
    const rootPc = normalizeInterval(keyPc + rootInterval);
    const thirdInterval = normalizeInterval(scaleIntervals[(degreeIndex + 2) % 7] - rootInterval);
    const fifthInterval = normalizeInterval(scaleIntervals[(degreeIndex + 4) % 7] - rootInterval);
    const quality = getTriadQuality(thirdInterval, fifthInterval);
    const roman = formatRomanNumeral(degreeIndex, quality);

    return {
      roman,
      name: `${pcToNote(rootPc)}${quality.suffix}`
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
  els.stringLabels.innerHTML = TUNING.map((note) => {
    const pc = NOTE_TO_PC[note];
    const isRoot = pc === state.displayRootPc;
    const isChord = (state.activeView === "chords" || state.activeView === "progressions") && state.chordPcs.includes(pc);
    const isScale = state.activeView === "scales" && state.scalePcs.includes(pc);
    const role = isRoot ? "root" : isChord ? "chord" : isScale ? "scale" : "";

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
      const noteLabel = state.showNoteNames ? pcToNote(pc) : "";
      const intervalLabel = state.showIntervals ? INTERVAL_LABELS[intervalFromRoot] || intervalFromRoot : "";
      const label = [noteLabel, intervalLabel].filter(Boolean).join("/");
      const role = isRoot ? "root" : showAsChord ? "chord" : "scale";

      elements.push(
        `<div class="note-dot ${role}" style="left:${x}px; top:${y}px" title="${pcToNote(pc)} fret ${fret}">${label}</div>`
      );
    }
  });

  els.fretboard.innerHTML = elements.join("");
}

function buildChordShapes(keyPc, chordIntervals, fretCount) {
  const chordPcs = chordIntervals.map((interval) => normalizeInterval(keyPc + interval));
  const notesNeeded = chordPcs.length;
  const stringGroups = [];
  const shapes = [];
  const seen = new Set();

  for (let start = 0; start <= TUNING.length - notesNeeded; start += 1) {
    stringGroups.push(Array.from({ length: notesNeeded }, (_, offset) => start + offset));
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
        `<div class="note-dot ${role}" style="left:${x}px; top:${y}px" title="${pcToNote(note.pc)} fret ${note.fret}">${pcToNote(note.pc)}</div>`
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
      return `<article class="sequence-card ${index === 0 ? "active" : ""}">
        <span class="index">${index + 1}</span>
        <span class="chord-name">${pcToNote(rootPc)} ${chordQuality}</span>
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
          <td>${pcToNote(state.activeProgressionChord.rootPc + normalized)}</td>
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
      const note = pcToNote(state.keyPc + interval);
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
