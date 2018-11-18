import { Macro } from './macro';

export interface Template {
  label: string,
  field: string,
  macros: Macro[]
}