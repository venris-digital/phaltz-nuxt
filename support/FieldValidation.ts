export const textFieldRules = [
  (v: string) => !!v || "Required: enter a value",
  (v: string) => (v && v.length >= 10) || "Must be at least 10 characters"
];

export const selectRules = [
  (v: string | number) => !!v || "Required: select a value"
];

export const selectRulesObject = [
  (v: Record<string, any>) => !!v?.id || "Required: select a value"
];

export const multiSelectRules = [
  (v: []) => v.length >= 1 || "Required: select at least 1 value"
];

export const tagsSelectRules = [
  (v: []) =>
    v.length > 2 || "3+ Required: Tags are the main way to categorise builds"
];

export const emailRules = [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
];

export const passwordRules = [
  (v: string) => !!v || "Required: enter a value",
  (v: string) => (v && v.length >= 8) || "Must be at least 8 characters"
];

export const displayNameRules = [
  (v: string) => !!v || "Required: enter a value",
  (v: string) => (v && v.length >= 4) || "Must be at least 4 characters"
];

export const checkboxRules = [
  (v: boolean) => !!v || "Required: confirm acknowledgement"
];
