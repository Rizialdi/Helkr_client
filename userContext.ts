import { createContext } from 'react';

export interface userContextInterface {
  id: string;
  token: string;
  prenom: string;
}

export interface providerInterface {
  user: userContextInterface;
  setUser: React.Dispatch<userContextInterface>;
}

export const UserContext = createContext<providerInterface | null>(null);
