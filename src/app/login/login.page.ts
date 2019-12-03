import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor() { }
  email="";
  pass="";

  
  sub() {
    if(this.email == "" || this.pass == "") {
      console.log("Enter full details");
    }
    else {
      
    }
  }

}
