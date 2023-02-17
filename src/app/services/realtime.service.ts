import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor() {
    this.startConnection();
  }

  private urlHub = 'http://localhost:5158/chatHub';
  private hubConnection = new signalR.HubConnectionBuilder()
                                      .withUrl(this.urlHub)
                                      .build();

  public startConnection() {
    this.hubConnection.start()
                .then(()=> console.log("Connection started"))
                .catch(error => console.log('Error while starting connection: ' + error));
  }

  public send(user: string, message: string) {
    this.hubConnection.invoke("SendMessage", user, message)
    .catch(error => {
      console.log(error);
    });
  }

  public addListener(callback: Function) {
    this.hubConnection.on("ReceiveMessage", (sender, text) => {
      
      let message: Message = new Message();
      message.Text = text;

      message.Sender = new User();
      message.Sender.Name= sender;
      
      callback(message);
    });
  }

  public invokeHub(methodName: string, ...args : any[]) : Promise<any> {
    return this.hubConnection.invoke(methodName, args);
  }
  
}
