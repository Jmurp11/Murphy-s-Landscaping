import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApolloAngularSDK } from 'src/app/generated/graphql';
import { Router } from '@angular/router';

export interface UserData {
  name: string;
  role: string;
  email: string;
  phone: number;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.sass']
})
export class UserTableComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  users: any[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayedColumns = [
      'name',
      'role',
      'email',
      'phone',
      'confirmed'
    ];

    this.userSub = this.apolloSdk.usersWatch()
      .valueChanges
      .subscribe(data => {
        this.users = data.data.users;
        console.log(this.users);
        this.dataSource = new MatTableDataSource(this.users);
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
    return this.router.navigate([`./users/${id}`]);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
