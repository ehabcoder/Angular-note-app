import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteReplyComponent } from './note-reply.component';

describe('NoteReplyComponent', () => {
  let component: NoteReplyComponent;
  let fixture: ComponentFixture<NoteReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteReplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
