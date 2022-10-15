import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Note, getNoteResponse } from '../note';
import { NoteService } from '../note.service';


@Component({
  selector: 'app-email-show',
  templateUrl: './note-show.component.html',
  styleUrls: ['./note-show.component.css']
})
export class NoteShowComponent implements OnInit {
  note: getNoteResponse;

  constructor(private noteService: NoteService, private route: ActivatedRoute) {
    // Resolver
    this.note = route.snapshot.data['email'];
    this.route.data.subscribe(({note}) => {
      this.note = note;
    })
  }

  ngOnInit(): void {
    // this.route.params.subscribe(({id}) => {
    //   this.noteService.getNote(id).subscribe(res => console.log(res))
    // })

    // this.route.params.pipe(
    //   switchMap(({id}) => {
    //     return this.noteService.getNote(id)
    //   })
    // ).subscribe((note) => {
    //   this.note = note;
    // })
    
  }

}
