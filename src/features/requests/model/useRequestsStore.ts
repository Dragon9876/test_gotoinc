import { persist, createJSONStorage } from 'zustand/middleware'
import { Request } from '@/shared/types/requests'

type State = {
    requests: Request[]
}

type Actions = {
    addPackage: (request: Request) => void
    editPackage: (request: Request) => void,
    deletePackage: (request: string) => void,
}

export type RequestsStore = State & Actions

export const useRequestsStore = 
    persist<State & Actions>(
      (set) => ({
        editPackage: (request) =>
          set((state) => ({
            requests: state.requests.map((req) =>
              req.id === request.id ? request : req
            ),
          })),
        deletePackage: (requestId) => requestId &&
          set((state) => ({
            requests: state.requests.filter((req) => req.id !== requestId),
          })),
        addPackage: (request) => set((state) => ({ requests: [...state.requests, request] })),
        requests: [],
      }),
      {
        name: 'requestsStorage',
        storage: createJSONStorage(() => localStorage)
      },
    );


