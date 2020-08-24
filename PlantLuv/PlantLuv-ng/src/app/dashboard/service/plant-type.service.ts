import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantType } from '../models/plant-type.model';

@Injectable({
  providedIn: 'root'
})
export class PlantTypeService {

  constructor(private httpClient: HttpClient) { }

  search(criteria: string): Observable<PlantType[]> {
    const query = new HttpParams()
    return this.httpClient.get<PlantType[]>('api/planttype/search')
  }


  grab(id: number): Observable<PlantType> {
    return this.httpClient.get<PlantType>(`api/planttype/${id}`)
  }


  update(plant: PlantType): Observable<PlantType> {
    return this.httpClient.put<PlantType>(`api/planttype/${plant.plantTypeID}`, plant);
  }


  create(plant: PlantType): Observable<PlantType> {
    return this.httpClient.post<PlantType>('api/planttype', plant)
  }
}
