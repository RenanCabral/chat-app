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

  constructor(private realtimeService: RealtimeService) {  }

  user: User;
  message: Message;
  dataSource: any[];
  displayedColumns: string[] = ["user", "comment"];

  loadComments() {
    this.dataSource = [
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender1 says:", message: "message1Test"},
      {sender: "TestSender2", message: "message1Testxsxzx"}
    ];
  }

  ngOnInit() {
    this.realtimeService.startConnection();
    this.realtimeService.addListener();

    this.user = new User();
    this.message = new Message();
    this.message.Sender = this.user;
    this.loadComments();
  }

  public sendMessage() {
    this.realtimeService.send(this.user.Name, this.message.Text);
  }
}
