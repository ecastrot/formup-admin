/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type CreateCompanyInput = {
  id?: string | null;
  name: string;
  active: boolean;
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  and?: Array<ModelCompanyConditionInput | null> | null;
  or?: Array<ModelCompanyConditionInput | null> | null;
  not?: ModelCompanyConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Company = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCompanyInput = {
  id: string;
  name?: string | null;
  active?: boolean | null;
};

export type DeleteCompanyInput = {
  id: string;
};

export type CreateUserGroupInput = {
  id?: string | null;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
};

export type ModelUserGroupConditionInput = {
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  companyId?: ModelIDInput | null;
  and?: Array<ModelUserGroupConditionInput | null> | null;
  or?: Array<ModelUserGroupConditionInput | null> | null;
  not?: ModelUserGroupConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type UserGroup = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: Company | null;
  users?: ModelUserInGroupConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type ModelUserInGroupConnection = {
  __typename: "ModelUserInGroupConnection";
  items?: Array<UserInGroup | null> | null;
  nextToken?: string | null;
};

export type UserInGroup = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: UserGroup;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: Company | null;
  groups?: ModelUserInGroupConnection | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserGroupInput = {
  id: string;
  name?: string | null;
  description?: string | null;
  active?: boolean | null;
  companyId?: string | null;
};

export type DeleteUserGroupInput = {
  id: string;
};

export type CreateUserInGroupInput = {
  id?: string | null;
  groupID: string;
  userID: string;
};

export type ModelUserInGroupConditionInput = {
  groupID?: ModelIDInput | null;
  userID?: ModelIDInput | null;
  and?: Array<ModelUserInGroupConditionInput | null> | null;
  or?: Array<ModelUserInGroupConditionInput | null> | null;
  not?: ModelUserInGroupConditionInput | null;
};

export type UpdateUserInGroupInput = {
  id: string;
  groupID?: string | null;
  userID?: string | null;
};

export type DeleteUserInGroupInput = {
  id: string;
};

export type CreateUserInput = {
  id?: string | null;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null;
  name?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  password?: ModelStringInput | null;
  role?: ModelStringInput | null;
  companyId?: ModelIDInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type UpdateUserInput = {
  id: string;
  email?: string | null;
  name?: string | null;
  active?: boolean | null;
  password?: string | null;
  role?: string | null;
  companyId?: string | null;
};

export type DeleteUserInput = {
  id: string;
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  and?: Array<ModelCompanyFilterInput | null> | null;
  or?: Array<ModelCompanyFilterInput | null> | null;
  not?: ModelCompanyFilterInput | null;
};

export type ModelCompanyConnection = {
  __typename: "ModelCompanyConnection";
  items?: Array<Company | null> | null;
  nextToken?: string | null;
};

export type ModelUserGroupFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  description?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  companyId?: ModelIDInput | null;
  and?: Array<ModelUserGroupFilterInput | null> | null;
  or?: Array<ModelUserGroupFilterInput | null> | null;
  not?: ModelUserGroupFilterInput | null;
};

export type ModelUserGroupConnection = {
  __typename: "ModelUserGroupConnection";
  items?: Array<UserGroup | null> | null;
  nextToken?: string | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  email?: ModelStringInput | null;
  name?: ModelStringInput | null;
  active?: ModelBooleanInput | null;
  password?: ModelStringInput | null;
  role?: ModelStringInput | null;
  companyId?: ModelIDInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items?: Array<User | null> | null;
  nextToken?: string | null;
};

export type CreateCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DeleteCompanyMutation = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserGroupMutation = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserGroupMutation = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserGroupMutation = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserInGroupMutation = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserInGroupMutation = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserInGroupMutation = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type GetCompanyQuery = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListCompanysQuery = {
  __typename: "ModelCompanyConnection";
  items?: Array<{
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetUserGroupQuery = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUserGroupsQuery = {
  __typename: "ModelUserGroupConnection";
  items?: Array<{
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items?: Array<{
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateCompanySubscription = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateCompanySubscription = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteCompanySubscription = {
  __typename: "Company";
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserGroupSubscription = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserGroupSubscription = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserGroupSubscription = {
  __typename: "UserGroup";
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  users?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserInGroupSubscription = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserInGroupSubscription = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserInGroupSubscription = {
  __typename: "UserInGroup";
  id: string;
  groupID: string;
  userID: string;
  group: {
    __typename: "UserGroup";
    id: string;
    name: string;
    description?: string | null;
    active: boolean;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    users?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    __typename: "User";
    id: string;
    email: string;
    name: string;
    active: boolean;
    password: string;
    role: string;
    companyId: string;
    company?: {
      __typename: "Company";
      id: string;
      name: string;
      active: boolean;
      createdAt: string;
      updatedAt: string;
    } | null;
    groups?: {
      __typename: "ModelUserInGroupConnection";
      nextToken?: string | null;
    } | null;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  active: boolean;
  password: string;
  role: string;
  companyId: string;
  company?: {
    __typename: "Company";
    id: string;
    name: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  groups?: {
    __typename: "ModelUserInGroupConnection";
    items?: Array<{
      __typename: "UserInGroup";
      id: string;
      groupID: string;
      userID: string;
      createdAt: string;
      updatedAt: string;
    } | null> | null;
    nextToken?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateCompany(
    input: CreateCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<CreateCompanyMutation> {
    const statement = `mutation CreateCompany($input: CreateCompanyInput!, $condition: ModelCompanyConditionInput) {
        createCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateCompanyMutation>response.data.createCompany;
  }
  async UpdateCompany(
    input: UpdateCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<UpdateCompanyMutation> {
    const statement = `mutation UpdateCompany($input: UpdateCompanyInput!, $condition: ModelCompanyConditionInput) {
        updateCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateCompanyMutation>response.data.updateCompany;
  }
  async DeleteCompany(
    input: DeleteCompanyInput,
    condition?: ModelCompanyConditionInput
  ): Promise<DeleteCompanyMutation> {
    const statement = `mutation DeleteCompany($input: DeleteCompanyInput!, $condition: ModelCompanyConditionInput) {
        deleteCompany(input: $input, condition: $condition) {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteCompanyMutation>response.data.deleteCompany;
  }
  async CreateUserGroup(
    input: CreateUserGroupInput,
    condition?: ModelUserGroupConditionInput
  ): Promise<CreateUserGroupMutation> {
    const statement = `mutation CreateUserGroup($input: CreateUserGroupInput!, $condition: ModelUserGroupConditionInput) {
        createUserGroup(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserGroupMutation>response.data.createUserGroup;
  }
  async UpdateUserGroup(
    input: UpdateUserGroupInput,
    condition?: ModelUserGroupConditionInput
  ): Promise<UpdateUserGroupMutation> {
    const statement = `mutation UpdateUserGroup($input: UpdateUserGroupInput!, $condition: ModelUserGroupConditionInput) {
        updateUserGroup(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserGroupMutation>response.data.updateUserGroup;
  }
  async DeleteUserGroup(
    input: DeleteUserGroupInput,
    condition?: ModelUserGroupConditionInput
  ): Promise<DeleteUserGroupMutation> {
    const statement = `mutation DeleteUserGroup($input: DeleteUserGroupInput!, $condition: ModelUserGroupConditionInput) {
        deleteUserGroup(input: $input, condition: $condition) {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserGroupMutation>response.data.deleteUserGroup;
  }
  async CreateUserInGroup(
    input: CreateUserInGroupInput,
    condition?: ModelUserInGroupConditionInput
  ): Promise<CreateUserInGroupMutation> {
    const statement = `mutation CreateUserInGroup($input: CreateUserInGroupInput!, $condition: ModelUserInGroupConditionInput) {
        createUserInGroup(input: $input, condition: $condition) {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserInGroupMutation>response.data.createUserInGroup;
  }
  async UpdateUserInGroup(
    input: UpdateUserInGroupInput,
    condition?: ModelUserInGroupConditionInput
  ): Promise<UpdateUserInGroupMutation> {
    const statement = `mutation UpdateUserInGroup($input: UpdateUserInGroupInput!, $condition: ModelUserInGroupConditionInput) {
        updateUserInGroup(input: $input, condition: $condition) {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserInGroupMutation>response.data.updateUserInGroup;
  }
  async DeleteUserInGroup(
    input: DeleteUserInGroupInput,
    condition?: ModelUserInGroupConditionInput
  ): Promise<DeleteUserInGroupMutation> {
    const statement = `mutation DeleteUserInGroup($input: DeleteUserInGroupInput!, $condition: ModelUserInGroupConditionInput) {
        deleteUserInGroup(input: $input, condition: $condition) {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserInGroupMutation>response.data.deleteUserInGroup;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async GetCompany(id: string): Promise<GetCompanyQuery> {
    const statement = `query GetCompany($id: ID!) {
        getCompany(id: $id) {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetCompanyQuery>response.data.getCompany;
  }
  async ListCompanys(
    filter?: ModelCompanyFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListCompanysQuery> {
    const statement = `query ListCompanys($filter: ModelCompanyFilterInput, $limit: Int, $nextToken: String) {
        listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListCompanysQuery>response.data.listCompanys;
  }
  async GetUserGroup(id: string): Promise<GetUserGroupQuery> {
    const statement = `query GetUserGroup($id: ID!) {
        getUserGroup(id: $id) {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserGroupQuery>response.data.getUserGroup;
  }
  async ListUserGroups(
    filter?: ModelUserGroupFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUserGroupsQuery> {
    const statement = `query ListUserGroups($filter: ModelUserGroupFilterInput, $limit: Int, $nextToken: String) {
        listUserGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUserGroupsQuery>response.data.listUserGroups;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  OnCreateCompanyListener: Observable<
    SubscriptionResponse<OnCreateCompanySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateCompany {
        onCreateCompany {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateCompanySubscription>>;

  OnUpdateCompanyListener: Observable<
    SubscriptionResponse<OnUpdateCompanySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateCompany {
        onUpdateCompany {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateCompanySubscription>>;

  OnDeleteCompanyListener: Observable<
    SubscriptionResponse<OnDeleteCompanySubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteCompany {
        onDeleteCompany {
          __typename
          id
          name
          active
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteCompanySubscription>>;

  OnCreateUserGroupListener: Observable<
    SubscriptionResponse<OnCreateUserGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUserGroup {
        onCreateUserGroup {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserGroupSubscription>>;

  OnUpdateUserGroupListener: Observable<
    SubscriptionResponse<OnUpdateUserGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUserGroup {
        onUpdateUserGroup {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserGroupSubscription>>;

  OnDeleteUserGroupListener: Observable<
    SubscriptionResponse<OnDeleteUserGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUserGroup {
        onDeleteUserGroup {
          __typename
          id
          name
          description
          active
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          users {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserGroupSubscription>>;

  OnCreateUserInGroupListener: Observable<
    SubscriptionResponse<OnCreateUserInGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUserInGroup {
        onCreateUserInGroup {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserInGroupSubscription>>;

  OnUpdateUserInGroupListener: Observable<
    SubscriptionResponse<OnUpdateUserInGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUserInGroup {
        onUpdateUserInGroup {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserInGroupSubscription>>;

  OnDeleteUserInGroupListener: Observable<
    SubscriptionResponse<OnDeleteUserInGroupSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUserInGroup {
        onDeleteUserInGroup {
          __typename
          id
          groupID
          userID
          group {
            __typename
            id
            name
            description
            active
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            users {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          user {
            __typename
            id
            email
            name
            active
            password
            role
            companyId
            company {
              __typename
              id
              name
              active
              createdAt
              updatedAt
            }
            groups {
              __typename
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserInGroupSubscription>>;

  OnCreateUserListener: Observable<
    SubscriptionResponse<OnCreateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser {
        onCreateUser {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnCreateUserSubscription>>;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<OnUpdateUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser {
        onUpdateUser {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnUpdateUserSubscription>>;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<OnDeleteUserSubscription>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser {
        onDeleteUser {
          __typename
          id
          email
          name
          active
          password
          role
          companyId
          company {
            __typename
            id
            name
            active
            createdAt
            updatedAt
          }
          groups {
            __typename
            items {
              __typename
              id
              groupID
              userID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
      }`
    )
  ) as Observable<SubscriptionResponse<OnDeleteUserSubscription>>;
}
