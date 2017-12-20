import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

import { ReportComponent } from './report/report.component';
import { ExpenseComponent } from './expense/expense.component';
import { ViewexpenseComponent } from './viewexpense/viewexpense.component';
import { AuthGuard } from './../user/auth-guard.service';
import { AuthService } from './../user/auth.service';
import { ExpenseService } from './expense.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'report', canActivate: [AuthGuard], component: ReportComponent },
      { path: 'expense', canActivate: [AuthGuard], component: ExpenseComponent },
      { path: 'expense/:id', canActivate: [AuthGuard], component: ExpenseComponent },
      { path: 'expense/view/:id', canActivate: [AuthGuard], component: ViewexpenseComponent }
    ])

  ],
  declarations: [
    ReportComponent,
    ExpenseComponent,
    ViewexpenseComponent
  ],
  providers: [
    DatePipe,
    AuthService,
    AuthGuard,
    ExpenseService
  ]
})
export class ExpenseModule { }
