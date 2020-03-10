import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


const TOKEN_KEY = 'jwt-token';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  
  data ;
  private heroesUrl = 'https://djangorestapiionic.herokuapp.com/posts';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
  };

  constructor(private auth: AuthService,private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.heroesUrl, this.httpOptions).subscribe(
      data => {this.data = data['results'];
      console.log(data['results']);

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

}
