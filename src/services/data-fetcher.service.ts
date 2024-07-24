import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obj } from '../assets/Obj';

@Injectable({
  providedIn: 'root',
})

export class dataFetcher {
  constructor(private http: HttpClient) { }

  private url: string = "https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json";

  getData(): Observable<Obj[]> {
    return this.http.get<Obj[]>(this.url);
  }
}