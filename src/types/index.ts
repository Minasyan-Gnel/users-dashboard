export interface ActionType<T> {
  type: string;
  payload: T;
}

export type UsersListOptionTypes = {
  gender: string;
  page: number;
  limit: number;
};
