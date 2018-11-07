import { HostsState } from './hosts.reducer';
import { Host } from '../models/host';

import * as fromHosts from './hosts.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface HostsState {
  ids: number[],
  entities: { [hostId: number]: Host }
}

const initialState: HostsState = {
  ids: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ],
  entities: {
    1: { id: 1,  ip: "10.10.10.251",   name: "Sonda Best monitoring",              type: "Server",           template1: true,  template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    2: { id: 2,  ip: "10.10.20.233",   name: "Cisco_WLC",                          type: "WiFi Controller",  template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    3: { id: 3,  ip: "10.10.20.240",   name: "Cisco_WLC_2",                        type: "WiFi Controller",  template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    4: { id: 4,  ip: "172.18.12.4",    name: "Pr_Via_Oderzo_1 VS Via_Oderzo_12",   type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    5: { id: 5,  ip: "172.18.12.3",    name: "Pr_Via_Oderzo_12 VS Via_Oderzo_1",   type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    6: { id: 6,  ip: "172.18.21.4",    name: "Pr_Via_Oderzo_12 VS Via_Oderzo_21",  type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    7: { id: 7,  ip: "172.18.21.3",    name: "Pr_Via_Oderzo_21 VS Via_Oderzo_12",  type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    8: { id: 8,  ip: "172.18.1.3",     name: "Pr_Via_Oderzo_1 VS Via_Oderzo_21",   type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    9: { id: 9,  ip: "172.18.1.4",     name: "Pr_Via_Oderzo_21 VS Via_Oderzo_1",   type: "Bridge Radio",     template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    10: { id: 10, ip: "10.10.10.253",   name: "Mikrotik Via_Oderzo_1",              type: "Router",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    11: { id: 11, ip: "10.10.20.253",   name: "Mikrotik Via_Oderzo_21",             type: "Router",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    12: { id: 12, ip: "192.168.30.253", name: "Mikrotik Via_Oderzo_12",             type: "Router",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    13: { id: 13, ip: "10.10.20.250",   name: "SW_2960_MAG_UD_1",                   type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    14: { id: 14, ip: "10.10.20.249",   name: "SW_2960_MAG_UD_2",                   type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    15: { id: 15, ip: "10.10.20.248",   name: "SW_2960_MAG_UD_3",                   type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    16: { id: 16, ip: "10.10.20.246",   name: "HP 2524 TC3",                        type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    17: { id: 17, ip: "10.10.20.245",   name: "HP 2524 Mag3",                       type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    18: { id: 18, ip: "10.10.20.243",   name: "Switch HP2510 MADIMER",              type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    19: { id: 19, ip: "10.10.20.244",   name: "MAG_UD",                             type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    20: { id: 20, ip: "10.10.20.238",   name: "Switch HP2530 Via_Oderzo_12 SW_2",   type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    21: { id: 21, ip: "10.10.20.237",   name: "Switch HP2530 Via_Oderzo_12 SW_1",   type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    22: { id: 22, ip: "10.0.0.52",      name: "Sw_2_Ced_Via_Oderzo_1",              type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    23: { id: 23, ip: "10.0.0.53",      name: "Sw_1_Ced_Via_Oderzo_1",              type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    24: { id: 24, ip: "10.0.0.51",      name: "Sw_3_Ced_Via_Oderzo_1",              type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" },
    25: { id: 25, ip: "10.0.0.54",      name: "Sw_Oderzo1_Uffici",                  type: "Switch",           template1: false, template2: false, template3: false, template1_macro1: "macro 1", template1_macro2: 2, template2_macro1: "macro 1", template3_macro1: "macro 1", template3_macro2: "macro 2", template3_macro3: "macro 3" }
  }
}

export function hostsReducer(
  state = initialState,
  action: fromHosts.HostsAction
): HostsState {
  switch (action.type) {
		case fromHosts.ADD_HOST: {
      const newHost = action.payload.host;
      const maxHostId = Math.max(...state.ids);
      const newHostId = maxHostId + 1;
      newHost.id = newHostId;
      return {
        ...state,
        ids: [ ...state.ids, newHostId ],
        entities: { ...state.entities, [newHostId]: newHost }
      }
		}
    case fromHosts.REMOVE_HOST: {
      const hostId = action.payload.hostId;
      const idIndex = state.ids.indexOf(hostId);
      if (idIndex >= 0) {
        const { [hostId]: removedHost, ...remainingHosts } = state.entities;
        return {
          ...state,
          ids: [ ...state.ids.slice (0, idIndex), ...state.ids.slice (idIndex + 1)],
          entities: remainingHosts
        }
      } else {
        return state;
      }
		}
		case fromHosts.UPDATE_HOST: {
      const hostId = action.payload.updates.id;
      const host = state.entities[hostId];
      return {
        ...state,
        entities: {
          ...state.entities,
          [hostId]: { ...host, ...action.payload.updates }
        }
      }
		}
  }
  return state;
}

export const selectHostsState = createFeatureSelector<HostsState>("hosts");

export const selectHosts = createSelector(
  selectHostsState,
  state => state.ids.map(id => state.entities[id])
);

export const selectHostIds = createSelector(selectHostsState, (state: HostsState) => state.ids);
export const selectHostEntities = createSelector(selectHostsState, (state: HostsState) => state.entities);