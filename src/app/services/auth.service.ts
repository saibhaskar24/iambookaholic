import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import {  map, switchMap, catchError } from 'rxjs/operators';
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
  private userDataID = new BehaviorSubject(null);
  private tok: string;
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken(); 
    
  }
 
  loadStoredToken() {
    let platformObs = from(this.plt.ready()); 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
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
        console.log("Res : ");
        console.log(res);
        return res['access'];
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userDataID.next(decoded);
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
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
 
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userDataID.next(null);
    });
  }
 
}