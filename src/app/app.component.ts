import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RealtimeService } from './services/realtime.service';
import {User} from './models/user.model';
import {Message} from './models/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private realtimeService: RealtimeService, private httpClient: HttpClient) {  }

  public user: User;
  public message: Message;

  ngOnInit() {
    this.realtimeService.startConnection();
    this.realtimeService.addListener();

    this.user = new User();
    this.message = new Message();
    this.message.Sender = this.user;
  }

  public sendMessage() {
    this.realtimeService.send(this.user.Name, this.message.Text);
  }
}
