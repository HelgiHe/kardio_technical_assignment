import { create } from 'zustand'
import { characterMovieData } from '../util/fakeData'

type ListItemProps = {
    title: string;
    subtitle: string;
    thumbnail: string;
  }

type ListStoreState = {
    listItems: ListItemProps[];
  }
  
  interface ListStoreActions {
    addItem: (incoming: ListItemProps) => void;
  }
  
  type ListStore = ListStoreState & ListStoreActions;
  

export const useListStore = create<ListStore>((set) => ({
  listItems: characterMovieData,
  addItem: (incoming: ListItemProps) => set((state) => ({ listItems: [...state.listItems, incoming] })),
}))