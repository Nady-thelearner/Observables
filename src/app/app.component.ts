import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
private activSub : Subscription;
  userActivate =false;
  constructor(private userService : userService) {}

  ngOnInit() {
    this.activSub = this.userService.activatedEmitter.subscribe( (didActivate : boolean) =>{
      this.userActivate = didActivate;

    })
  }

  ngOnDestroy(): void {
    this.activSub.unsubscribe();
  }

}
