import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesListComponent } from './components/matches-list/matches-list.component';
import { MatchDetailsComponent } from './components/match-details/match-details.component';
import { AddMatchComponent } from './components/add-match/add-match.component';



const routes: Routes = [
  { path: '', redirectTo: 'matches', pathMatch: 'full' },
  { path: 'matches', component: MatchesListComponent },
  { path: 'matches/:id', component: MatchDetailsComponent },
  { path: 'add', component: AddMatchComponent },
  // { path: 'tennis', component: }
  // { path: 'basketball', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
