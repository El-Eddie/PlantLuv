import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Plant } from '../models/plant.model';
import { NewUserPlant } from '../models/new-plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private httpClient: HttpClient) { }

  search(criteria: string): Observable<Plant[]>{
    const query = new HttpParams()  // ToDo: create method to transform criteria into HttpParams
    return this.httpClient.get<Plant[]>('', { params: query }) // ToDo: Fill in url to controller action here
  }

  getUserPlants(id: string): Observable<Plant[]>{
    return this.httpClient.get<Plant[]>(`api/plants/search?ownerId=${id}`)
  }

  grab(id: number): Observable<Plant>{
    return this.httpClient.get<Plant>(`api/plants/${id}`)
  }

  save(plant: Plant): Observable<Plant>{
    return this.httpClient.post<Plant>(`api/plants/${plant.plantId}`, plant)
  }

  create(plant: NewUserPlant): Observable<Plant>{
    return this.httpClient.post<Plant>('api/plants', plant)
  }

  delete(id: number): Observable<Plant>{
    console.log(`deleting ${id}`)
    // return this.httpClient.delete<Plant>(`api/plants/${id}`)
    this.httpClient.delete<Plant>(`api/plants/${id}`).subscribe(results =>
      console.log(results));

    return of(null)
  }

  waterPlant(ids: number[]): Observable<Plant>{
    var model = {
      plantIdArray: ids,
      Timestamp: new Date()
    };
    return this.httpClient.patch<Plant>('api/plants/water', model)
  }

  fertalizePlant(ids: number[]): Observable<Plant>{
    var model = {
      plantIdArray: ids,
      Timestamp: new Date()
    };
    return this.httpClient.patch<Plant>('api/plants/feed', model)
  }

}
