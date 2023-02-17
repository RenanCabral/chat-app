import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../services/realtime.service';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConversationService } from '../services/conversation.service';

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

  constructor(private conversationService: ConversationService) {}

  ngOnInit() {
    this.user = new User();
    this.user.Name = "Test User";

    this.message = new Message();
    this.message.Sender = this.user;

    this.conversationService.setIncomingMessageHandler(this.receiveMessage);
  }

  public sendMessage() {

    var message = new Message();
    message.Sender = this.user;
    message.Text = this.message.Text;

    this.conversationService.sendMessage(message);
  }

  public receiveMessage(message : Message) {
      this.dataSource.data = this.dataSource.data.concat([message]);
  }
}
