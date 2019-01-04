import { Issue } from './../../models/issue.model';
import { IssueService } from './../../services/issue.service';
import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[];
  displayedColumns: string[] = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.fetchIssues();
  }
  fetchIssues() {
    this.issueService
    .getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Données demandées ...');
      console.log(this.issues);
    });
  }
  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
