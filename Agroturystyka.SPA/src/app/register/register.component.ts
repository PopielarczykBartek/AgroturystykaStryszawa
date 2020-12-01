import { Component, EventEmitter,Output, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): any{
  }


    register(): any{
      this.authService.register(this.model).subscribe(() => {
        console.log('rejestracja udana!');
      }, error =>{
          console.log(error);
      });
    }

    cancel(): any{
      this.cancelRegister.emit(false);
      console.log('anulowane');
    }
}
