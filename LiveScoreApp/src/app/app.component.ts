import { Component, OnInit } from '@angular/core';
import { faFootballBall, faFlagUsa } from '@fortawesome/free-solid-svg-icons';
// import { WebSocketService } from './services/web-socket.service';
import { WebSocketService } from './services/web-socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LiveScoreApp';
  faFootball = faFootballBall;
  faFlagUsa = faFlagUsa;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {

    this.webSocketService.listen('test event').subscribe((data) => {
      console.log(data);
    });

  }

}
