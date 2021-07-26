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
}
