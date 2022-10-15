import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NoteIndexComponent } from './note-index/note-index.component';
import { NoteShowComponent } from './note-show/note-show.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { NoteFormComponent } from './note-form/note-form.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteReplyComponent } from './note-reply/note-reply.component';


@NgModule({
  declarations: [
    HomeComponent,
    NoteIndexComponent,
    NoteShowComponent,
    NotFoundComponent,
    PlaceholderComponent,
    NoteFormComponent,
    NoteCreateComponent,
    NoteReplyComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
