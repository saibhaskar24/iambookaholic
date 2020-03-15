import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  data =null ;
  phno = "13346";
  
  private heroesUrl = 'https://djangorestapiionic.herokuapp.com/users/' + this.auth.getUserID().user_id + '/';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
  };

  constructor(private auth: AuthService,private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.heroesUrl, this.httpOptions).subscribe(
      data => {this.data = data['results'];
      console.log(data);
      },
      err => {
        console.log(err);
        this.auth.newToken();
        this.httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
        };
        this.ngOnInit();
      }
    );
  }
  logout() {
    this.auth.logout();
  }
}
