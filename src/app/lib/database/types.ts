import { CreateUserData, UpdateUserData, User } from "../types";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: CreateUserData;
        Update: UpdateUserData;
      };
    };
  };
}
