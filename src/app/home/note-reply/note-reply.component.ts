import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { getNoteResponse } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-reply',
  templateUrl: './note-reply.component.html',
  styleUrls: ['./note-reply.component.css']
})
export class NoteReplyComponent implements OnChanges {
  showModal = false;
  @Input() note;
  alertText = '';
  showAlert: boolean;

  constructor(private noteService: NoteService) { }

  ngOnChanges(): void {
    this.note = {
      ...this.note,
      
    }
  }

  onSubmit(note) {
    this.noteService.sendNote(note).subscribe((res: {message: string}) => {
      this.alertText = res.message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
        this.showModal = false;
      }, 2000)
    })
  }
}
