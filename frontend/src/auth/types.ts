export type IUser = {
  _id: string;
  name: string;
  email: string;
  created: Date;
};
export type iUserSignIn = {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    created: Date;
  };
  error?: string;
};
