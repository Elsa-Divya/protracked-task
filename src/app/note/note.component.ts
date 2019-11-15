import { Component, OnInit } from '@angular/core';
import { Note } from '../model/note';
import { FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { NoteService } from '../services/note.service';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {


  showCreatePanel: boolean = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.isPanelOpen.subscribe(data => {
      this.showCreatePanel = data;
    })
  }

  toggle() {
    this.showCreatePanel = !this.showCreatePanel;
  }





}
