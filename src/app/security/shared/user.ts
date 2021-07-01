import { Tenant } from "src/app/general/shared/model/tenant";
import { Role } from "./role";
import { UserGroup } from "./user-group";

export interface User {
  id?: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: Role;
  groups: UserGroup[];
  tenantId?: string;
  tenant?: Tenant;
}
