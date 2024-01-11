import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Cats} from "../../models/cats.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  /**
   * Pomocná proměnná pro předávání dat mezi kontrolery
   */
  detail?: Cats;

  constructor(
    // Vložím servisku pro Dependency Injection (pro komunikaci s API skrze HTTP protokol)
    // private je doporučeno pro koncové třídy,
    //  pokud by se jednalo o abstraktní třídu, nebo třídu určenou k dědění použil bych public nebo protected
    private http: HttpClient
  ) {
  }

  getCats(): Observable<Cats> {
    return this.http.get<Cats>(`${environment.baseUrl}images/search?&api_key=${environment.apiToken}`);

  }
  getHairless(): Observable<Cats> {
    return this.http.get<Cats>(`${environment.baseUrl}images/search?breed_ids=sphy&api_key=${environment.apiToken}`);

  }
}
