import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  currentMatch = null;
  message = '';

  constructor(
    private matchService: MatchService,
    private webSocketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getMatch(this.route.snapshot.paramMap.get('id'));

    // this.matchService.listen('Updatedmatch').subscribe((data) => console.log(data));

    this.webSocketService.listen('UpdatedMatch').subscribe((data) => {
      // console.log(data);
      this.updatedMatch(data);
    });
  }

  getMatch(id) {
    this.matchService.get(id)
      .subscribe(
        data => {
          this.currentMatch = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status) {
    const data = {
      title: this.currentMatch.title,
      description: this.currentMatch.description,
      published: status
    };

    this.matchService.update(this.currentMatch.id, data)
      .subscribe(
        response => {
          this.currentMatch.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateMatch() {
    this.matchService.update(this.currentMatch.id, this.currentMatch)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The match was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  updatedMatch(data) {
    //
  }

  deleteMatch() {
    this.matchService.delete(this.currentMatch.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/matches']);
        },
        error => {
          console.log(error);
        });
  }

}
