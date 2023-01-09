import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  constructor() { }

  public startConnection(url: string){

   var hubConnection = new signalR.HubConnectionBuilder()
                             .withUrl(url)
                             .build();

   hubConnection.start()
                .then(()=> console.log("Connection started"))
                .catch(error => console.log('Error while starting connection: ' + error));
      
  }
}
