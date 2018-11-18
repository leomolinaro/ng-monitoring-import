import { HostsState } from './hosts.reducer';
import { Host } from '../models/host';

import * as fromHosts from './hosts.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface HostsState {
  ids: number[],
  entities: { [hostId: number]: Host }
}

const initialState: HostsState = {
  ids: [ 1, 2, 3, 4, 5 ],
  entities: {
    1: { id: 1,  ip: "10.10.10.251",   name: "Server 1",  type: "Server",           pingBasic: true,   },
    2: { id: 2,  ip: "10.10.20.233",   name: "WLC 1",     type: "WiFi Controller",  pingBasic: false,  },
    3: { id: 3,  ip: "10.10.20.240",   name: "WLC 2",     type: "WiFi Controller",  pingBasic: false,  },
    4: { id: 4,  ip: "172.18.12.4",    name: "Ponte 1",   type: "Bridge Radio",     pingBasic: false,  },
    5: { id: 5,  ip: "172.18.12.3",    name: "Ponte 2",   type: "Bridge Radio",     pingBasic: false,  },
  }
}

export function hostsReducer(
  state = initialState,
  action: fromHosts.HostsAction
): HostsState {
  switch (action.type) {
		case fromHosts.ADD_HOST: {
      const newHost = action.payload.host;
      const maxHostId = state.ids.length > 0 ? Math.max(...state.ids) : 0;
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