import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApolloAngularSDK } from 'src/app/generated/graphql';
import { Router } from '@angular/router';

export interface JobData {
  id: string;
  customer: string;
  landscaper: string;
  jobType: string;
  cost: number;
  dateRequested: string;
  isCompleted: boolean;
  dateCompleted: string;
  isPaid: boolean;

}

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.sass']
})
export class JobTableComponent implements OnInit, OnDestroy {
  jobSub: Subscription;
  jobs: any[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<JobData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [
      'id',
      'customer',
      'landscaper',
      'jobType',
      'cost',
      'dateRequested',
      'isCompleted',
      'dateCompleted',
      'isPaid'
    ];

    this.jobSub = this.apolloSdk.jobsWatch()
      .valueChanges
      .subscribe(data => {
        this.jobs = data.data.jobs;
        console.log(this.jobs);
        this.dataSource = new MatTableDataSource(this.jobs);
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
    return this.router.navigate([`./jobs/${id}`]);
  }

  ngOnDestroy(): void {
    this.jobSub.unsubscribe();
  }
}
