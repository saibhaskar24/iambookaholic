import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
 
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken(); 
    
  }
 
  loadStoredToken() {
    let platformObs = from(this.plt.ready());
    console.log("load T");
 
    this.user = platformObs.pipe(
      switchMap(() => {
        console.log("stored T");
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          console.log("unsaved");
          let decoded = helper.decodeToken(token); 
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }
 
  login(credentials: {email: string, pw: string }) {
    let v = "no";
    let tt;
    // Normally make a POST request to your APi with your login credentials
    this.http.post<any>('https://djangorestapiionic.herokuapp.com/api/token/', {
      "username": "bhaskar",
      "password": "Sai@24091999"
      }).subscribe(data => {
    console.log(data);
    console.log(v)
    tt = data.token;
    
    v = "yes";
    console.log(v);
    })
    if (v == "no") {
      return of(null);
    }
    

    return this.http.get('https://randomuser.me/api/').pipe(
      take(1),
      map(res => {
        return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1Njc2NjU3MDYsImV4cCI6MTU5OTIwMTcwNiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiMTIzNDUiLCJmaXJzdF9uYW1lIjoiU2ltb24iLCJsYXN0X25hbWUiOiJHcmltbSIsImVtYWlsIjoic2FpbW9uQGRldmRhY3RpYy5jb20ifQ.4LZTaUxsX2oXpWN6nrSScFXeBNZVEyuPxcOkbbDVZ5U`;
      }),
      switchMap(token => {
        console.log("decoder");
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);
 
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        console.log("done"+TOKEN_KEY+ token);
        return storageObs;
      })
    );
  }
 
  getUser() {
    return this.userData.getValue();
  }
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
 
}