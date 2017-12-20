import { DatePipe } from '@angular/common';
import { ToastrService } from '../../common/toastr.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExpenseService } from '../expense.service';
import { AuthService } from './../../user/auth.service';
import { IExpense } from './../expense';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  userObj: any;
  reportTitle: string;
  expenses: IExpense;
  totalrows: number;
  pgCounter: number;
  qreport: string;
  qstartdt: string;
  qenddt: string;
  qpage: number;
  qsort: string;
  exptotal: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private expenseService: ExpenseService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) { }

  report = new FormControl('opt1');
  startdt = new FormControl({ value: '', disable: true });
  enddt = new FormControl({ value: '', disable: true });

  ngOnInit() {
    this.userObj = this.authService.currentUser;
    this.reportForm = this.fb.group({
      report: this.report,
      startdt: this.startdt,
      enddt: this.enddt
    });

    this.activeRoute.queryParams.forEach((params: Params) => {
      this.qreport = params['report'] || '';
      this.qstartdt = params['startdt'] || '';
      this.qenddt = params['enddt'] || '';
      this.qpage = params['page'] || '';
      this.qsort = params['sortby'] || '';

      if (this.qreport !== '') {

      }
    })
  }

}
