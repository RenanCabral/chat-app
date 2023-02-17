import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { RealtimeService } from './realtime.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private realtimeService: RealtimeService) { }

  public sendMessage(message: Message) {
    
    this.realtimeService.invokeHub("SendMessage", message.Sender.Name, message.Text)
    .catch(error => {
      console.log(error);
    });
  }

  public setIncomingMessageHandler(incomingMessageHander: Function) {
    this.realtimeService.addListener(incomingMessageHander);
  }

}
