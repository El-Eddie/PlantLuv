import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private httpClient: HttpClient) { }

  search(criteria: string): Observable<Plant[]>{
    const query = new HttpParams()  // ToDo: create method to transform criteria into HttpParams
    return this.httpClient.get<Plant[]>('', { params: query }) // ToDo: Fill in url to controller action here
  }

  getUserPlants(id: number): Observable<Plant[]>{ // Temporary function. To be removed when searching is fully implemented.
    return this.httpClient.get<Plant[]>('');
  }

  grab(id: number): Observable<Plant>{
    return this.httpClient.get<Plant>(''+id)
  }

  save(plant: Plant): Observable<Plant>{
    // const id = plant.id
    return this.httpClient.put<Plant>('', plant)
  }

  create(plant: Plant): Observable<Plant>{
    return this.httpClient.post<Plant>('', plant)
  }

  delete(id: number): Observable<Plant>{
    return this.httpClient.delete<Plant>(''+id)
    //Delete method on the API controller likely won't return a model. What should this method return?
  }

  waterPlant(id: number): Observable<Plant>{
    return this.httpClient.patch<Plant>('',id)
  }

  fertalizePlant(id: number): Observable<Plant>{
    return this.httpClient.patch<Plant>('',id)
  }

  toggleFavorite(id: number): Observable<Plant>{
    return this.httpClient.patch<Plant>('',id)
  }

  toggleAlerts(id: number): Observable<Plant>{
    return this.httpClient.patch<Plant>('',id)
  }
}
