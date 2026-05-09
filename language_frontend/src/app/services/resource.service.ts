import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Resource, ResourceRequest } from 'src/app/entities/resource.model';
import { PaginationParams } from "src/app/entities/common.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { };

  getMyResources({ page = 1, size = 10 }: PaginationParams): Observable<{ resources: Resource[], count: number }> {
    return this.http.get<{ resources: Resource[], count: number }>(`${this.apiUrl}/resources?page=${page}&size=${size ? size : 0}`);
  };

  createResource(req: ResourceRequest): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/resource`, req);
  };
}
