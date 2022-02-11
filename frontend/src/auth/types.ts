// export type IUser = {
//   _id: string;
//   name: string;
//   email: string;
//   created: Date;
// };
// export type iUserSignIn = {
//   token: string;
//   user: {
//     _id: string;
//     name: string;
//     email: string;
//     created: Date;
//   };
//   error?: string;
// };
import { User } from "../user/types";

export type { User };

export type ReturnedSigninProps = {
  token: string;
  user: User;
  error?: any;
};
export type SigninProps = (user: {
  email: string;
  password: string;
}) => Promise<ReturnedSigninProps>;
