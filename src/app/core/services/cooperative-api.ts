import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CooperativeDto, CreateCooperativeDto } from '../interfaces/cooperative-api';

@Injectable({
  providedIn: 'root',
})
export class CooperativeApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + 'api/cooperatives';

  getAll(): Observable<CooperativeDto[]> {
    return this.http.get<CooperativeDto[]>(this.baseUrl);
  }

  /**
   * Backend controller currently binds without @RequestBody, so we send form-urlencoded.
   */
  create(payload: CreateCooperativeDto): Observable<CooperativeDto> {
    const body = new HttpParams()
      .set('registrationNumber', payload.registrationNumber)
      .set('name', payload.name)
      .set('location', payload.location);

    return this.http.post<CooperativeDto>(this.baseUrl, body.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }
}
