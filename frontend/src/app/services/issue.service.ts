import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.uri}/issues`);
  }
  getIssueById(id: string): Observable<Issue>  {
    return this.http.get<Issue>(`${this.uri}/issues/${id}`);
  }
  addIssue(title, responsible, description, severety): Observable<Issue>{
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severety
    };
    return this.http.post<Issue>(`${this.uri}/issues/add`, issue);
  }
  updateIssue(id, title, responsible, description, severety, status): Observable<any> {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severety,
      status: status
    };
    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }


  deleteIssue(id): Observable<Issue> {
    console.log(id);
    return this.http.delete<Issue>(`${this.uri}/issues/delete/${id}`);
  }

  /*
 deleteIssue(id): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
        .append('Content-Type', 'application/json; charset=UTF-8');
    const httpOptions = {
        headers: header,
        body: { _id: id }
    };
    return this.http.delete<any>(`${this.uri}/issues/delete/${id}`, httpOptions);
}
*/
}
