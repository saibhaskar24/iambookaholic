import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import {  map, switchMap, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 
const helper = new JwtHelperService();
const A_KEY = 'access-token';
const R_KEY = 'refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userDataID = new BehaviorSubject(null);
  private tok: string;
  private platformObs: Observable<any> = from(this.plt.ready()); 
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken(); 
    
  }
 
  loadStoredToken() {
    this.user = this.platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(A_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token); 
          this.userDataID.next(decoded);
          this.tok = token;
          return true;
        } else {
          return null;
        }
      })
    );
  }
 
  login(credentials: {email: string, pw: string }) {

    
   return this.http.post<any>('https://djangorestapiionic.herokuapp.com/api/token/', {
      "username": credentials.email,
      "password": credentials.pw
      }).pipe(
      map(res => {
        return res;
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token['access']);
        this.userDataID.next(decoded);
        let storageObs = from(this.storage.set(A_KEY, token['access']));
        storageObs = from(this.storage.set(R_KEY, token['refresh']));
        console.log(storageObs)
        return storageObs;
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }
 
  getUserID() {
    return this.userDataID.getValue();
  }
  getToken() {
    return this.tok;
  }

  newToken() {
    this.storage.get(R_KEY).then((token) => {
      this.http.post('https://djangorestapiionic.herokuapp.com/api/token/refresh/', {
        "refresh": token,
        }).subscribe(
            data => this.storage.set(A_KEY, data),
            err => {console.log(err);
            console.log("Error in auth servise new token")}
          );
        
    });
      
  }
 
  logout() {
    this.storage.remove(A_KEY);
    this.storage.remove(R_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userDataID.next(null);
    });
  }
 
}