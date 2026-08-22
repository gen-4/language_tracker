import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LanguageRequest, Resource, ResourceRequest, VideoInfo } from 'src/app/entities/resource.model';
import { PaginationParams } from "src/app/entities/common.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = environment.baseApiUrl;
  constructor(private http: HttpClient) { };

  getMyResources({ page = 1, size = 10, language }: PaginationParams): Observable<{ resources: Resource[], count: number }> {
    let url = `${this.apiUrl}/resources?page=${page}&size=${size ? size : 0}`;

    if (language) {
      url += `&language=${language}`;
    }

    return this.http.get<{ resources: Resource[], count: number }>(url);
  };

  createResource(req: ResourceRequest): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}/resource`, req);
  };

  getVideoInfo(videoId: string): Observable<VideoInfo> {
    return this.http.get<VideoInfo>(`${this.apiUrl}/video/${videoId}`);
  };

  changeLanguage(req: LanguageRequest): Observable<null> {
    return this.http.put<null>(`${this.apiUrl}/user/language`, req);
  };

}
