export type MacroType = "number" | "string" | "SLA";

export interface Macro {
  label: string,
  field: string,
  // type: MacroType
}