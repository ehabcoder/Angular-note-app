// This is an asynchronous validator
import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class UniqueEmail implements AsyncValidator {
    constructor(private authService: AuthService) {}
    validate = (control: FormControl) => {
        const {value} = control;
        return this.authService.emailAvailable(value).pipe(
            map((value) => {
                if (value.available === true) return null;
                  // But we can just return null
                  // return null;
            }),
            catchError((error) => {
                console.log()
                 if(error.error.available === false) {
                     return of({nonUniqueEmail: true})
                 } 
                 else if(error.status === 0) {
                     return of({noConnection: true});
                 } else {
                    return null;
                 }
            })
        )
    }
}
