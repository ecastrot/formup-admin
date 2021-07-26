import { Injectable } from "@angular/core";
import { Company } from "src/app/general/shared/model/company";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _company: Company = {
    id: "70a22b4c-0396-4b6a-b256-2d269c5eb28f",
    name: "FormUp",
    active: true,
  };

  constructor() {
    localStorage.setItem("companyId", this._company.id);
  }

  getCompany(): Company {
    return this._company;
  }

  get companyId(): string {
    return this._company.id;
  }
}
