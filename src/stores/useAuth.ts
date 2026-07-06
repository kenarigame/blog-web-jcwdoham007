import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  objectId: string;
  email: string;
  userToken: string;
  name: string;
}

type Store = {
  user: UserAuth | null;
  login: (user: UserAuth) => void;
  logout: () => void;
};

export const useAuth = create<Store>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user: user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth" },
  ),
);