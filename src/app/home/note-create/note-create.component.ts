import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { getNoteResponse, Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  showModal = false;
  note;
  showAlert = false;
  alertText;
  constructor(private noteService: NoteService) { 
    this.note = {
      noteId: '',
      noteTitle: '',
      noteBody: '',
      noteDisabled: false,
      noteOwnerEmail: `${localStorage.getItem('useremail')}`,
      noteSenderEmail: '' 
    }
  }

  ngOnInit(): void {
  }

  onSubmit(note) {
    // Send the Note via the note service
    return this.noteService.sendNote(note).subscribe((res: {message: string}) => {
      this.alertText = res.message;
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
        this.showModal = false;
      }, 2000)
    })
  }

}
