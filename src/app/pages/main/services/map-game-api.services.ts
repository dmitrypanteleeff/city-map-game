import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapGameApiService {
  constructor(private _http: HttpClient) {}

  getListCityFromLetter(
    character: string,
    numPrefix: number
  ): Observable<any> | void {
    //const { rapidApiKey, rapidApiHost, urlLetterCity, urlLetterCityNamePrefix, urlLetterCityMinPopulation } = environment
    //const currentLanguage = 'rus';
    //const languageCode = currentLanguage === 'eng' ? '' : '&languageCode=ru';
    // const languageCode = '&languageCode=ru';
    // const headers = {
    //   'X-RapidAPI-Key': `${rapidApiKey}`,
    //   'X-RapidAPI-Host': `${rapidApiHost}`,
    // };
    // let bodyRequest = `${urlLetterCity}${numPrefix}${urlLetterCityNamePrefix}${character}${languageCode}${urlLetterCityMinPopulation}`;
    // return this._http
    //   .get<any>(bodyRequest, { headers })
    //   .pipe(map((res: any) => {
    //     const data = res;
    //     console.log('service data', data)
    //     return data;
    // }))
  }
}
