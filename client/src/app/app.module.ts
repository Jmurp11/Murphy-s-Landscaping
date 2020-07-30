import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphQLModule } from './graphql.module';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppMaterialModule } from './app-material.module';
import { UserTableComponent } from './users/user-table/user-table.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ExpenseTableComponent } from './expenses/expense-table/expense-table.component';
import { JobTableComponent } from './jobs/job-table/job-table.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobsComponent } from './jobs/jobs.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoadingComponent } from './ui/loading/loading.component';
import { BreadcrumbComponent } from './ui/breadcrumb/breadcrumb.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    ExpenseTableComponent,
    ExpenseDetailComponent,
    JobDetailComponent,
    JobTableComponent,
    UsersComponent,
    JobsComponent,
    ExpensesComponent,
    UserTableComponent,
    UserDetailComponent,
    LoadingComponent,
    BreadcrumbComponent,
    SigninComponent,
    RegisterComponent
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
