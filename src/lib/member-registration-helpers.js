export const herkunftLabels = {
  "play-stay": "Play & Stay",
  "bekanntschaft-trainer": "Bekanntschaft / Trainer",
  "anderer-verein": "anderer Verein",
  sonstiges: "Sonstiges",
};

export const herkunftOptions = [
  { value: "play-stay", label: "Play & Stay" },
  { value: "bekanntschaft-trainer", label: "Bekanntschaft / Trainer" },
  { value: "anderer-verein", label: "anderer Verein" },
  { value: "sonstiges", label: "Sonstiges" },
];

export function getHerkunftLabel(value) {
  return herkunftLabels[value] || value || "Keine Angabe";
}
