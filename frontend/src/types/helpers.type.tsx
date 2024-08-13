export type IAlert = {
  message: string;
  status: number | null;
};
export type AlertContextValue = {
  alert: IAlert | null;
  setAlert: React.Dispatch<React.SetStateAction<IAlert | null>>;
};

export type UserStateType = {
  user: { firstname: string; lastname: string } | null;
  setUser: (body: { id: string; firstname: string; lastname: string } | null) => void;
};
