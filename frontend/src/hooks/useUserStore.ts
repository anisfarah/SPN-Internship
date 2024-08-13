import { UserStateType } from '@/types/helpers.type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUser = create(
  persist<UserStateType>(
    (set) => ({
      user: null,
      setUser: (body) => set(() => ({ user: body }))
    }),
    {
      name: 'user', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useUser;
