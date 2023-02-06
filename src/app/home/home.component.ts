import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    /*  this.firstSubscription=  interval(1000).subscribe( count=>{
     console.log(count);
    }); */

    const customeObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5) {
          observer.complete();
        }

        if (count > 6) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
        // observer.error();
        // observer.complete();
      }, 1000);
    });

    this.firstSubscription = customeObservable
      .pipe(
        filter((data) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Nady:' + (data + 1);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed');
        }
      );
  }
  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
