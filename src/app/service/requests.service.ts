import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private uriApi = 'http://localhost:8000/api/courses';

  private http = inject(HttpClient)

  getdItems(): Observable<any[]> {
    return this.http.get<any>(this.uriApi);
  }

  createItem(item: any) {
    return this.http.get<any>(this.uriApi, item);
  }

  updateItem(id: number, item: any) {
    return this.http.get<any>(`${this.uriApi}/${id}`, item);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.uriApi}/${id}`);
  }
   
}
