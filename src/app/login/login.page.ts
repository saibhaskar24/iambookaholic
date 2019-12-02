import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }
  email="";
  pass="";

  ngOnInit() {
  }
  sub() {
    if(this.email == "" || this.pass == "") {
      console.log("Enter full details");
    }
    else {
      
    }
  }

}
