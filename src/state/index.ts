import React from "react";
import { User } from "firebase";

interface AppState {
  user: User | null;
}

export const AppContext = React.createContext<AppState>({
  user: null
});
