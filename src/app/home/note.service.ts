import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Note, getNoteResponse } from './note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url = 'http://localhost:3000/notes'
  
  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<Note[]>(this.url, { headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    } })
  }

  getNote(id: string) {
    return this.http.get<getNoteResponse>(`${this.url}/${id}`, {
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
    });
  }

  sendNote(note) {
    return this.http.post(`${this.url}/send`, note, {
      headers: {
        "Authorization": localStorage.getItem('token')
      }
    })
  }

}
