import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor() {}

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

  public addListener() {
    this.hubConnection.on("ReceiveMessage", (user, message) => {
      console.log(user);
      console.log(message);
    })
  }
}
