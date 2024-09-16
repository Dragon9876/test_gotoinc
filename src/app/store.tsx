import { create } from 'zustand'
import { useRequestsStore } from '@/features/requests/model/useRequestsStore'
import { RequestsStore } from '@/features/requests/model/useRequestsStore'

export type Store = RequestsStore;

export const useStore = create<Store>((...state) => ({
  ...useRequestsStore(...state),
}))