import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { getRandomNumber } from '../utils';
import { LanguageTypeName } from '../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class MapGameApiService {
  private readonly _http = inject(HttpClient);

  getListCityFromLetter(
    currentLanguage: LanguageTypeName,
    character: string
  ): Observable<any> {
    const {
      rapidApiKey,
      rapidApiHost,
      urlLetterCity,
      urlLetterCityNamePrefix,
      urlLetterCityMinPopulation,
    } = environment;
    const languageCode = currentLanguage === 'eng' ? '' : '&languageCode=ru';
    const headers = {
      'X-RapidAPI-Key': `${rapidApiKey}`,
      'X-RapidAPI-Host': `${rapidApiHost}`,
    };
    const numPrefix = getRandomNumber(20);
    let bodyRequest = `${urlLetterCity}${numPrefix}${urlLetterCityNamePrefix}${character}${languageCode}${urlLetterCityMinPopulation}`;
    return this._http.get<any>(bodyRequest, { headers }).pipe(
      map((res: any) => {
        const data = res;
        return data;
      })
    );
  }
}
