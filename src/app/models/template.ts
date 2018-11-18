import { Macro } from './macro';
import { HostType } from './host';

export interface Template {
  label: string,
  field: string,
  macros: Macro[],
  hostTypes: HostType[]
}