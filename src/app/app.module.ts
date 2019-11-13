import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import {MatButtonModule} from '@angular/material/button';

import { SidenavComponent } from './sidenav/sidenav.component';
import { NotesComponent } from './notes/notes.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NoteComponent } from './note/note.component';
import { AddUpdateNoteComponent } from './add-update-note/add-update-note.component';
import { FilterPipe } from './filters/filter.pipe';

import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NotesComponent,
    NoteComponent,
    AddUpdateNoteComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DragDropModule
  ],
  providers: [],
  entryComponents : [AddUpdateNoteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
