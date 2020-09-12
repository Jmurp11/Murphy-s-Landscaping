import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApolloAngularSDK } from 'src/app/generated/graphql';
import { Router } from '@angular/router';

export interface ExpenseData {
  id: string;
  jobId: string;
  expenseType: string;
  cost: number;
  customer: string;
  jobType: string;
}

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.sass']
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
  expenseSub: Subscription;
  expenses: any[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<ExpenseData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'jobId',
      'expenseType',
      'cost',
      'customer',
      'jobType'
    ];

    this.expenseSub = this.apolloSdk.expensesWatch()
      .valueChanges
      .subscribe(data => {
        this.expenses = data.data.expenses;
        console.log(this.expenses);
        this.dataSource = new MatTableDataSource(this.expenses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navigate(id: string) {
    console.log(id);
    return this.router.navigate([`./expenses/${id}`]);
  }

  ngOnDestroy(): void {
    this.expenseSub.unsubscribe();
  }
}
