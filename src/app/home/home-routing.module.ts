import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteShowComponent } from './note-show/note-show.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { NoteResolver } from './note.resolver';

const routes: Routes = [
  { path: '', 
  component: HomeComponent,
  children: [
    { path: 'not-found', component: NotFoundComponent },
    { path: ':id', component: NoteShowComponent, resolve: {
      note: NoteResolver
    } },
    { path: '', component: PlaceholderComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
