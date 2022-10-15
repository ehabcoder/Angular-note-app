import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getNoteResponse } from '../note';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  @Input() note: getNoteResponse;
  @Output() noteSubmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    const { noteTitle, noteBody, noteDisabled, noteOwnerEmail, noteSenderEmail } = this.note;
    this.noteForm = new FormGroup({
      noteTitle: new FormControl(noteTitle, [Validators.required]),
      noteBody: new FormControl(noteBody, [Validators.required]),
      noteDisabled: new FormControl(noteDisabled),
      noteOwnerEmail: new FormControl({value: noteOwnerEmail, disabled: true}),
      noteSenderEmails: new FormControl(noteSenderEmail, [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    if (this.noteForm.invalid) return;
    this.noteSubmit.emit(this.noteForm.value)
  }

}
