import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { WebSocketService } from 'src/app/services/web-socket.service';


@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {

  matches: any = [];
  currentMatch = null;
  currentIndex = -1;
  title = '';

  constructor(private matchService: MatchService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.retrieveMatches();
    this.webSocketService.listen('CreatedMatch').subscribe((data) => {
      // console.log(data);
      this.createdMatch(data);
    });

    this.webSocketService.listen('UpdatedMatch').subscribe((data) => {
      // console.log(data);
      this.updatedMatch(data);
    });

    this.webSocketService.listen('DeletedMatch').subscribe((data) => {
      // console.log("deleted match");
      this.deletedMatch(data);
    });

    this.webSocketService.listen('DeleteAllMatches').subscribe(() => {
      // console.log("deleted match");
      this.deleteAllMatchesClient();
    });
  }

  retrieveMatches() {
    this.matchService.getAll()
      .subscribe(
        data => {
          this.matches = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveMatches();
    this.currentMatch = null;
    this.currentIndex = -1;
  }

  setActiveMatch(match, index) {
    this.currentMatch = match;
    this.currentIndex = index;
  }

  removeAllMatches() {
    this.matchService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveMatches();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle() {
    this.matchService.findByTitle(this.title)
      .subscribe(
        data => {
          this.matches = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  createdMatch(data) {
    console.log("Data pushlandı.");
    this.matches.push(data);
  }

  updatedMatch(data) {

    const index = this.matches.findIndex(e => e.id === data.id);

    this.matches[index] = data;
  }

  deletedMatch(data) {
    console.log("Match deleted for clients");
    const index = this.matches.findIndex(e => e.id === data.id);

    this.matches.splice(index, 1);
  }

  deleteAllMatchesClient() {
    this.matches.length = 0;
  }

}
