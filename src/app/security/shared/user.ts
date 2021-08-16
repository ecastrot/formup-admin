import { Company } from "src/app/general/shared/model/company";
import { Role } from "./role";
import { UserGroup } from "./user-group";

export interface User {
  id?: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: Role;
  groups?: UserGroup[];
  companyId?: string;
  company?: Company;
}
