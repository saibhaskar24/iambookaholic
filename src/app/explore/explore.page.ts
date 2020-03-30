import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';
// import { Observable, of } from 'rxjs';


const TOKEN_KEY = 'jwt-token';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  cards;
  constructor(private auth: AuthService,private http: HttpClient) {
    this.cards = [];
  }
  data =null ;
  
  private heroesUrl = 'https://djangorestapiionic.herokuapp.com/posts';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
  };

  
  loadTinderCards() {
    this.cards = [
      {
        img: "https://placeimg.com/300/300/people",
        title: "Demo card 1",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/animals",
        title: "Demo card 2",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/nature",
        title: "Demo card 3",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/tech",
        title: "Demo card 4",
        description: "This is a demo for Tinder like swipe cards"
      },
      {
        img: "https://placeimg.com/300/300/arch",
        title: "Demo card 5",
        description: "This is a demo for Tinder like swipe cards"
      }
    ]
  };
  
  

  

  ngOnInit() {
    // this.http.get(this.heroesUrl, this.httpOptions).subscribe(
    //   data => {this.data = data['results'];
    //   console.log(data['results']);

    //   },
    //   err => {
    //     console.log(err);
    //     this.auth.newToken();
    //     this.httpOptions = {
    //       headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
    //     };
    //     this.ngOnInit();
    //   }
    // );
  }

}
