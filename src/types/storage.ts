export type DataUserType = {
  name: string;
  avatar: string;
  email: string;
  password: string;
  type_auth: "email_password" | "oauth2";
};

export type DataSubTodoType = {
  id: string;
  title: string;
  completed: boolean;
};

export type DataTodoType = {
  id: string;
  title: string;
  timestamp: string;
  completed: boolean;
  subtasks: DataSubTodoType[];
};

export type DataUserTodoType = {
  user: string;
  data: DataTodoType[];
};

export type DataStoragesKindType = "users" | "todos" | "user";

export type DataType =
  | DataUserTodoType[]
  | DataUserType[]
  | DataUserType
  | null;
