import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }


success(message: string): any{
  alertify.success(message);
}

error(message: string): any{
  alertify.error(message);
}

warning(message: string): any{
  alertify.warning(message);
}

message(message: string): any{
  alertify.message(message);
}

confirm(message: string, okCallback: () => any){
  alertify.confirm(message, (e) => {
    if(e) {
      okCallback();
    } else {}
  });
}

}
