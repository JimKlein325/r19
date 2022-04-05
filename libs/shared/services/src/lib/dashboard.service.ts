import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {ProjectSummary} from '../../../models/src/lib/project-summaries'
import { projectSummaries } from './project-summaries'
// const BASE_URL = 'http://localhost:3000/books';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  all():Observable<ProjectSummary[]> {
    return of(projectSummaries);
  }


}
