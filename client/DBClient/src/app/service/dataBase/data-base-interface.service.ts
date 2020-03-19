import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataBaseInterfaceService {

  constructor(
    private http: HttpClient,
    ) {
    }

  getTableList() {
    return this.http.get('/api/tables');
  }

  getColumns(table: string) {
    const params = new HttpParams()
      .set('table', table);
    return this.http.get(`/api/fields`, {params});
  }

  getRecords(table: string) {
    if (table) {
      return this.http.get(`/api/${table}`);
    }
  }

  addRecord(table: string, record) {
    if (table) {
      return this.http.post(`/api/${table}`, record);
    }
  }

  deleteRecord(table: string, id: string) {
    if (table) {
      const params = new HttpParams()
        .set('id', id);
      return this.http.delete(`/api/${table}`, {params});
    }
  }
}
