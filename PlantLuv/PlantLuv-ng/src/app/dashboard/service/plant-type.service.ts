import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlantType } from '../models/plant-type.model';

@Injectable({
  providedIn: 'root'
})
export class PlantTypeService {

  constructor(private httpClient: HttpClient) { }

  search(criteria: string): Observable<PlantType[]>{
    const query = new HttpParams()
    return this.httpClient.get<PlantType[]>(' proper_url_to_API ', { params: query })
  }

  grab(name: string): Observable<PlantType>{
    return this.httpClient.get<PlantType>(''+name)
  }

}
