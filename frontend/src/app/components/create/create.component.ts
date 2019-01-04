import { IssueService } from './../../services/issue.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatFormField, MatCard } from '@angular/material';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() createForm: FormGroup;


  constructor(private issueService: IssueService,
              private formBuilder: FormBuilder,
              private router: Router) {
                this.createForm = this.formBuilder.group({
                  title: ['', Validators.required],
                  responsible: '',
                  description: '',
                  severity: ''
                });
               }

onFormSubmit() {
  this.issueService.addIssue(this.createForm.get('title').value, this.createForm.get('responsible').value,
  this.createForm.get('description').value, this.createForm.get('severity').value).subscribe(() => {
    this.router.navigate(['/list']);
  });
  }
addIssue(title, responsible, description, severity) {
  this.issueService.addIssue(title, responsible, description, severity).subscribe(() => {
    this.router.navigate(['/list']);
  });
}

  ngOnInit() {
  }

}
