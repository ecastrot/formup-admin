import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CreateUserInGroupInput, CreateUserInput } from "src/app/API.service";
import { ApiService } from "src/app/general/shared/services/api.service";
import { SessionService } from "./services/session.service";
import { User } from "./user";
import { UserGroup, UserInGroup } from "./user-group";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private apiService: ApiService,
    private sessionService: SessionService
  ) {}


  saveUser(user: User): Observable<User> {
    const statement = `mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        email
        name
        active
        password
        role
        companyId
      }
    }`;
    return this.apiService.saveWithCompany("createUser", statement, user);
  }

  saveGroup(userGroup: UserGroup): Observable<UserGroup> {
    const statement = `mutation CreateUserGroup($input: CreateUserGroupInput!) {
      createUserGroup(input: $input) {
        id
        name
        description
        active
        companyId
      }
    }`;
    return this.apiService.saveWithCompany("createUserGroup", statement, userGroup);
  }

  addUserToGroup(userInGroup: UserInGroup): Observable<UserInGroup> {
    const statement = `mutation CreateUserInGroup($input: CreateUserInGroupInput!) {
      createUserInGroup(input: $input) {
        id
        groupID
        userID
      }
    }`;
    return this.apiService.save("createUserInGroup", statement, userInGroup);
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

  getUserList(): Observable<User[]> {
    const statement = `query Query($filter: ModelUserFilterInput) {
      listUsers(filter: $filter) {
        items {
          id
          email
          name
          active
          password
          role
          companyId
        }
      }
    }`;
    return this.apiService.getListDataWithCompany("listUsers", statement);
  }

  getUsersInGroupList(groupIp: string): Observable<User[]> {
    const statement = `query Query($filter: ModelUserFilterInput) {
      listUsers(filter: $filter) {
        items {
          id
          email
          name
          active
          password
          role
          companyId
        }
      }
    }`;
    return this.apiService.getListDataWithCompany("listUsers", statement);
  }
}
