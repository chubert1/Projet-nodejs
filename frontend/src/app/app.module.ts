import { IssueService } from './services/issue.service';
import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import {MatToolbarModule, MatFormFieldModule,MatOptionModule} from '@angular/material' ;
import {MatSelectModule, MatIconModule, MatButtonModule, MatCardModule} from '@angular/material' ;
import {MatTableModule, MatDividerModule, MatSnackBarModule} from '@angular/material' ;
import {HttpClientModule} from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full' }
];
@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
     MatFormFieldModule,
     MatInputModule,
     MatOptionModule,
     MatSelectModule,
     MatIconModule,
     MatButtonModule,
     MatCardModule,
     MatTableModule,
     MatDividerModule,
     MatSnackBarModule,
     ReactiveFormsModule,
     FormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
