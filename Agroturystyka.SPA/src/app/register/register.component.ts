import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, 
              private alertify: AlertifyService) { }

  ngOnInit(): any{
  }


    register(): any{
      this.authService.register(this.model).subscribe(() => {
        this.alertify.success('rejestracja udana!');
      }, error => {
          this.alertify.error('Wystąpił błąd rejestracji');
      });
    }

    cancel(): any{
      this.cancelRegister.emit(false);
    }
}
