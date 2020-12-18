export interface UserModel {
  gender: string;
  avatar: string;
  fullName: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  id: string;
  postcode: number;
  phones: Array<string> | [];
  emails: Array<string> | [];
  location: {
    city: string;
    country: string;
    postcode: number;
    street: {
      number: number;
      name: string;
    };
  };
}
