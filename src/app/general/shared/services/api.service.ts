import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { SessionService } from "src/app/security/shared/services/session.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(private sessionService: SessionService) {}

  getDataById(nameQuery: string, statement: string, id: string): Observable<any> {
    const gqlAPIServiceArguments: any = {
      id
    };
    return from(API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))).pipe(map(result => result.data[nameQuery]));
  }

  getListDataWithCompany(nameQuery: string, statement: string, filter?: any): Observable<any> {
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      filter = {...filter , companyId: { eq: this.sessionService.companyId }}
    }else{
      filter = {companyId: { eq: this.sessionService.companyId }}
    }
    gqlAPIServiceArguments.filter = filter;
    return from(API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))).pipe(map(result => result.data[nameQuery].items));
  }

  executeWithCompany(nameMutation: string, statement: string, input: any): Observable<any> {
    input.companyId = this.sessionService.companyId;
    return this.execute(nameMutation, statement, input)
  }

  execute(nameMutation: string, statement: string, input: any): Observable<any> {
    const gqlAPIServiceArguments: any = {
      input
    };
    return from(API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))).pipe(map(result => result.data[nameMutation]));
  }
}
