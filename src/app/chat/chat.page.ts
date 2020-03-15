import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  user = null;
 
  constructor(private auth: AuthService) {}
 
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = this.auth.getUserID();
  }
 
  

}
