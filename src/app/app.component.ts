import { Component, OnInit } from '@angular/core';
import { RealtimeService } from './services/realtime.service';
import { User } from './models/user.model';
import { Message } from './models/message.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
