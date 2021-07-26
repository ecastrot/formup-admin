import { Company } from "src/app/general/shared/model/company";
import { User } from "./user";

export interface UserGroup {
  id?: string;
  name: string;
  description?: string;
  active: boolean;
  companyId: string;
  company?: Company;
  users?: User[];
}
