import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApolloAngularSDK, ExpenseQueryInput } from '../../generated/graphql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.sass']
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  expenseSub: Subscription;
  id: string;
  expense: any;

  constructor(
    private route: ActivatedRoute,
    private apolloSdk: ApolloAngularSDK
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];

        const input: ExpenseQueryInput = {
          id: this.id
        };

        this.expenseSub = this.apolloSdk.expense({ data: input })
          .subscribe(data => {
            console.log(data);
            this.expense = data.data.expense;
          });
      });
  }

  ngOnDestroy(): void {
    this.expenseSub.unsubscribe();
  }
}
