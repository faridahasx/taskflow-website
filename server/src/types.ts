import { IUser } from "./models/user";

interface AuthenticatedUser {
  userId: IUser["_id"];
}

export { AuthenticatedUser };
