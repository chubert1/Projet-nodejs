import { Issue } from './../../models/issue.model';
import { IssueService } from './../../services/issue.service';

import { MatSnackBar } from '@angular/material';

import {Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatFormField, MatCard } from '@angular/material';




@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
id: string;
issue: any = {};
updateForm: FormGroup;

  constructor(private issueService: IssueService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {

this.createForm();
               }

createForm() {
  this.updateForm = this.formBuilder.group({
    title: ['', Validators.required],
    responsible: '',
    description: '',
    severity: '',
    status: ''
  });
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);

      });
    });
  }
  onFormSubmit() {
    this.issueService.updateIssue(this.id, this.updateForm.get('title').value, this.updateForm.get('responsible').value,
    this.updateForm.get('description').value, this.updateForm.get('severity').value, this.updateForm.get('status').value).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
    });
    }

  updateIssue(title, responsible, description, severity, status) {
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status).subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
