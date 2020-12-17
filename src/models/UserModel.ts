export interface UserModel {
  gender: string;
  avatar: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: number;
  phones: Array<string> | [];
  emails: Array<string> | [];
}
