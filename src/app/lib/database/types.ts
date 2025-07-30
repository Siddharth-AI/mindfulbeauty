import { CreateEmployeeData, CreateUserData, Employee, UpdateEmployeeData, UpdateUserData, User } from "../types";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: CreateUserData;
        Update: UpdateUserData;
      };
      employees: {
        Row: Employee;
        Insert: CreateEmployeeData;
        Update: UpdateEmployeeData;
      };
    };
  };
}
