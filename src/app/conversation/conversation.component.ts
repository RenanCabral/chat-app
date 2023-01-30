import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  user: User;
  message: Message;
  dataSource = new MatTableDataSource<Message>;
  displayedColumns: string[] = ["user", "comment"];

  constructor(private realtimeService: RealtimeService) {}

  ngOnInit() {
    this.user = new User();
    this.user.Name = "Test User";

    this.message = new Message();
    this.message.Sender = this.user;

    this.realtimeService.startConnection();
    
    this.realtimeService.addListener((message : Message) => {
      this.dataSource.data = this.dataSource.data.concat([message]);
    });
  }

  public sendMessage() {
    this.realtimeService.send(this.user.Name, this.message.Text);
  }
}
