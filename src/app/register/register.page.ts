import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {
  credentials = {
    email: '',
    pw: '',
    username: '',
  };

  private Url = 'https://djangorestapiionic.herokuapp.com/users/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
  };

  constructor(private auth: AuthService,
    private router: Router,private http: HttpClient) { }

    reg() {

      this.http.post(this.Url, {
      "email": this.credentials.email,
      "username": this.credentials.username,
      "password": this.credentials.pw
        }, this.httpOptions).subscribe(
            data => {console.log(data);
              this.router.navigateByUrl('/');},
            err => {console.log(err);
            console.log("Error creating new user")}
          );
    }
}
