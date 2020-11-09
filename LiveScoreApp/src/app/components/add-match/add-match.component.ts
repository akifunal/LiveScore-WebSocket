import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { faFootballBall, faFlagUsa } from '@fortawesome/free-solid-svg-icons';
import { Match } from 'src/Model/match';


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  faFootball = faFootballBall;
  faFlagUsa = faFlagUsa;
  submitted = false;

  match = {
    teamHome: '',
    teamAway: '',
    score: '',
    published: false,
    scoreHome: '',
    scoreAway: ''
  };

  constructor(private matchService: MatchService, private webSocketService: WebSocketService) { }

  ngOnInit(): void { }

  saveMatch() {
    const data = {
      title: this.match.teamHome + ' - ' + this.match.teamAway,
      score: this.match.scoreHome + ' - ' + this.match.scoreAway
    };

    this.matchService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
    this.webSocketService.emit('newMatch', data);
  }

  newMatch() {
    this.submitted = false;
    this.match = {
      teamHome: '',
      teamAway: '',
      score: '',
      published: false,
      scoreHome: '',
      scoreAway: ''
    };
  }

}
