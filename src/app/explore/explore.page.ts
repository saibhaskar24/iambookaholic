import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

const TOKEN_KEY = 'jwt-token';
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    console.log(this.auth.getToken());
  }

}
