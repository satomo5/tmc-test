import { createContext, useContext, ReactNode } from "react";
import { DataUserType } from "../types/storage";
import { getStorageData } from "../libs/storage";

export const UserContext = createContext<DataUserType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storageUser = getStorageData("user") as DataUserType | null;

  if (!storageUser) {
    window.location.href = "/";
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        name: storageUser.name,
        avatar: storageUser.avatar,
        email: storageUser.email,
        password: storageUser.password,
        type_auth: storageUser.type_auth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used inside the UserContext");
  }

  return { ...context };
}
