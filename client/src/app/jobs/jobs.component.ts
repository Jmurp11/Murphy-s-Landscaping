import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApolloAngularSDK, JobInput, JobsDocument } from '../generated/graphql';

enum JobTypes {
  seeding = 'Seeding',
  lawncare = 'Lawn Care',
  hedges = 'Hedges',
  springCleanup = 'Spring Cleanup',
  fallCleanup = 'Fall Cleanup',
  planting = 'Planting',
  snowRemoval = 'Snow Removal',
  miscellaneous = 'Miscellaneous'
}
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent implements OnInit, OnDestroy {

  form: FormGroup;
  loading: boolean;
  jobTypes: string [];
  customers: any [];
  customersSub: Subscription;
  addJobSub: Subscription;

  constructor(private apolloSdk: ApolloAngularSDK) { }

  ngOnInit(): void {
    this.loading = false;
    this.jobTypes = [
      JobTypes.seeding,
      JobTypes.lawncare,
      JobTypes.hedges,
      JobTypes.springCleanup,
      JobTypes.fallCleanup,
      JobTypes.planting,
      JobTypes.snowRemoval,
      JobTypes.miscellaneous
    ];

    this.customersSub = this.apolloSdk.customers()
      .subscribe(data => {
        this.customers = data.data.customers;
    });

    this.form = new FormGroup({
      customer: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      cost: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      jobType: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }
    addJob() {
      const todaysDate = new Date();
      const jobData: JobInput = {
        customer: this.form.get('customer').value.id,
        cost: this.form.get('cost').value,
        jobType: this.form.get('jobType').value
      };
      console.log(jobData);
      console.log(todaysDate);

      this.addJobSub = this.apolloSdk.createJob(
        {data: jobData},
        {
          refetchQueries: [{
            query: JobsDocument
        }]
      }
      ).subscribe(res => console.log(res));
    }

    reset() {
      console.log('Form Cleared!');
      this.form.reset();

    }

    ngOnDestroy(): void {
      this.customersSub.unsubscribe();
      this.addJobSub.unsubscribe();
    }


  }
