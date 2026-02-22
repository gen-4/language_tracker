import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource } from 'src/app/entities/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  // TODO: This will have to come from environ
  private apiUrl = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { };

  getMyResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}/resources`);
  };
}
