import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ProjectSummary} from '../../../models/src/lib/project-summaries'

// const BASE_URL = 'http://localhost:3000/books';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<ProjectSummary[]>('./project-summaries.json');
  }


}
