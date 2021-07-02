import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  public resultados: any;
  private apikey: string = 'J4cjruxqhmuoGO92FsFRkyAszj5JqCp8';
  private url: string = `https://api.giphy.com/v1/gifs`;

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];

  }



  get historial() {
    return [...this._historial]
  }



  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.url}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      })


  }


}
