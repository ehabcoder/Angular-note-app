import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { getNoteResponse } from './note';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class NoteResolver implements Resolve<getNoteResponse> {
  constructor(private noteService: NoteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    return this.noteService.getNote(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/home/not-found')
        return EMPTY;
      })
    );
  }
}
