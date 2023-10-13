export interface IEmployee {
  employeeId?: number | any;
  firstName: string;
  lastName: string;
  salary: number | any;
  email: string;
  gender: string;
  languages?: string[] | null;
  prefLocation?: number | any;
  profile: string;
  terms: boolean;
}
