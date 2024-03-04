import { create } from 'zustand'
import { characterMovieData } from '../util/fakeData'
import { ListItemProps } from '../components/MainListItem';


type ListStoreState = {
    listItems: ListItemProps[];
  }
  
  interface ListStoreActions {
    addItem: (incoming: ListItemProps) => void;
    removeItem: (title: string) => void;
  }
  
  type ListStore = ListStoreState & ListStoreActions;
  

export const useListStore = create<ListStore>((set) => ({
  listItems: characterMovieData,
  addItem: (incoming: ListItemProps) => set((state) => ({ listItems: [...state.listItems, incoming] })),
  removeItem: (title) => set((state) => ({ listItems: state.listItems.filter(item => item.title !== title) })),
}))