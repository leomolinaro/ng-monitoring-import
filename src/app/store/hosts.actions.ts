import { Host } from '../models/host';
export const ADD_HOST = "[App] Add Host";
export const REMOVE_HOST = "[App] Remove Host";
export const UPDATE_HOST = "[App] Update Host";
import { Action } from '@ngrx/store';

export class AddHost implements Action { readonly type = ADD_HOST; constructor (public payload: { host: Host }) {} }
export class RemoveHost implements Action { readonly type = REMOVE_HOST; constructor (public payload: { hostId: number }) {} }
export class UpdateHost implements Action { readonly type = UPDATE_HOST; constructor (public payload: { updates: Partial<Host> & { id: number } }) {} }

export type HostsAction = 
AddHost |
RemoveHost |
UpdateHost;