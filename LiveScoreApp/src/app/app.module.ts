import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    AddMatchComponent,
    MatchDetailsComponent,
    MatchesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
