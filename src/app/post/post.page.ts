import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage  {
  content = "";
  name = "";

  private Url = 'https://djangorestapiionic.herokuapp.com/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': `Bearer ${this.auth.getToken()}`})
  };

  constructor(private auth: AuthService,
    private router: Router,private http: HttpClient) { }

    po() {
      console.log(this.content+" "+ this.name+" "+this.auth.getUserID().user_id);
      this.http.post(this.Url+"posts/",  {
        "content": this.content,
        "name": this.name,
        "user": this.Url+"users/"+this.auth.getUserID().user_id + "/" ,
        }, this.httpOptions,).subscribe(
            data => {console.log(data);
              this.router.navigateByUrl('/tabs');},
            err => {console.log(err);
            console.log("Error in posting")}
          );
    }
}
