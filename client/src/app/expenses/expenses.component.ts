import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApolloAngularSDK, ExpenseInput, ExpensesDocument } from '../generated/graphql';
import { Subscription } from 'rxjs';

enum ExpenseTypes {
  seed = 'Seed',
  gas = 'Gas',
  oil = 'Oil',
  soil = 'Soil',
  fertilizer = 'Fertilizer',
  plants = 'Plants',
  equipment = 'equipment',
  miscellaneous = 'Miscellaneous'
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.sass']
})
export class ExpensesComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  expenseTypes: string [];
  jobs: any [];
  jobsSub: Subscription;
  addExpenseSub: Subscription;

  constructor(private apolloSdk: ApolloAngularSDK) { }

  ngOnInit(): void {
    this.loading = false;
    this.expenseTypes = [
      ExpenseTypes.seed,
      ExpenseTypes.gas,
      ExpenseTypes.oil,
      ExpenseTypes.soil,
      ExpenseTypes.fertilizer,
      ExpenseTypes.plants,
      ExpenseTypes.equipment,
      ExpenseTypes.miscellaneous
    ];

    this.jobsSub = this.apolloSdk.jobs()
      .subscribe(data => {
        this.jobs = data.data.jobs;
        console.log(data);
    });

    this.form = new FormGroup({
      cost: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      job: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      expenseType: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  addExpense() {
    const expenseData: ExpenseInput = {
      cost: this.form.get('cost').value,
      job: this.form.get('job').value.id,
      expenseType: this.form.get('expenseType').value,
    };

    this.addExpenseSub = this.apolloSdk.createExpense(
      {data: expenseData},
      {
        refetchQueries: [{
          query: ExpensesDocument
      }]
    }
    ).subscribe(res => console.log(res));

  }

  reset() {
    console.log('Form Cleared!');
    this.form.reset();

  }

  ngOnDestroy(): void {
    this.jobsSub.unsubscribe();
  }

}

