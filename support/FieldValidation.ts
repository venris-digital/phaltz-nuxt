export const textFieldRules = [
  (v: string) => !!v || "Required: enter a value",
  (v: string) => (v && v.length >= 10) || "Must be at least 10 characters"
];

export const selectRules = [
  (v: string | number) => !!v || "Required: select a value"
];

export const multiSelectRules = [
  (v: []) => v.length >= 1 || "Required: select at least 1 value"
];

export const tagsSelectRules = [
  (v: []) =>
    v.length > 2 || "3+ Required: Tags are the main way to categorise builds"
];
