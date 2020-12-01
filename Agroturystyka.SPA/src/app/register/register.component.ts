import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any;
  model: any = {};

  constructor() { }

  ngOnInit(): any{
  }


    register(): any{
      console.log(this.model);
    }

    cancel(): any{
      console.log('anulowane');
    }
}
