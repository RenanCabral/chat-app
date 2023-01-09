import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RealtimeService } from './services/realtime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-app';
  urlHub = 'http://localhost:5158/chatHub';
  constructor(private realtimeService: RealtimeService, private httpClient: HttpClient) {  }

  ngOnInit(){
    this.realtimeService.startConnection(this.urlHub);
  }
}
