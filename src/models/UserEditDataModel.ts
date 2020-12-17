export interface UserEditDataModel {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: number;
  emails: Array<string>;
  phones: Array<string>;
}
