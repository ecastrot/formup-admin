import { Tenant } from "src/app/general/shared/model/tenant";

export interface UserGroup {
  id?: string;
  name: string;
  description: string;
  active: boolean;
  tenantId?: string;
  tenant?: Tenant;
}
