import { Component, ViewChild } from '@angular/core';
import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'keep-notes';

  @ViewChild(NotesComponent,{static:false})
  notes:NotesComponent

  getNotes(e){
    console.log('notes',e)
    this.notes.getNotes()
  }
}
