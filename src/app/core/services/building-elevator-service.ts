import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Building } from '../contracts/building.contract';
import { BuildingsSummary } from '../contracts/building-summary';

@Injectable({
  providedIn: 'root',
})
export class BuildingElevatorService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<BuildingsSummary> {
    return this.http.get<BuildingsSummary>(`${this.apiUrl}building/${id}`);
  }

  getAll(): Observable<BuildingsSummary> {
    return this.http.get<BuildingsSummary>(`${this.apiUrl}building`);
  }

  create(building: Building): Observable<Building> {
    return this.http.post<Building>(`${this.apiUrl}building`, building);
  }

  update(id: string, building: Partial<Building>): Observable<Building> {
    return this.http.patch<Building>(`${this.apiUrl}building/${id}`, building);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}building/${id}`);
  }
}
