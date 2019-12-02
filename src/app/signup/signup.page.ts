import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

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
