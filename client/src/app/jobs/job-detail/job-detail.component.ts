import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApolloAngularSDK, JobQueryInput } from '../../generated/graphql';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.sass']
})
export class JobDetailComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  jobSub: Subscription;
  id: string;
  job: any;

  constructor(
    private route: ActivatedRoute,
    private apolloSdk: ApolloAngularSDK
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];

        const input: JobQueryInput = {
          id: this.id
        };

        this.jobSub = this.apolloSdk.job({ data: input })
          .subscribe(data => {
            console.log(data);
            this.job = data.data.job;
          });
      });
  }

  ngOnDestroy(): void {
    this.jobSub.unsubscribe();
  }
}
