import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ApiService } from "src/app/general/shared/services/api.service";
import { SessionService } from "./services/session.service";
import { UserGroup } from "./user-group";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private sessionService: SessionService
  ) {}

  saveGroup(userGroup: UserGroup): Observable<UserGroup> {
    userGroup.companyId = this.sessionService.companyId;
    // return from(this.api.CreateUserGroup(userGroup));
    return of(null);
  }

  getUserGroupList(): Observable<UserGroup[]> {
    const statement = `query Query($filter: ModelUserGroupFilterInput) {
      listUserGroups(filter: $filter) {
        items {
          id
          name
          description
          active
          companyId
        }
      }
    }`;
    return this.apiService.getListDataWithCompany("listUserGroups", statement);
  }
}
