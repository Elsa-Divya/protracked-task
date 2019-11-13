import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
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
  showTitleInput: boolean = false;
  note: Note;
  title = new FormControl('');
  content = new FormControl('');
  selectedLabel = new FormControl();

  isEditNoteActive:boolean = false;


  labels: String[] = ["danger","testing"];
  selected_labels: String[] = [];

  modalRef:BsModalRef;



  constructor(private noteService:NoteService) { }

 

  ngOnInit() {
    this.noteService.isPanelOpen.subscribe(data=>{
      this.showCreatePanel = data;
    })
  }


  toggle(){
    this.showCreatePanel = !this.showCreatePanel;
  }

  toggleTitle(){
    this.showTitleInput = !this.showTitleInput;
  }

  createNote(){
  
    let newNote:Note = <Note>{
      title : this.title.value,
      content : this.content.value,
      id : Math.random(),
      color:"white",
      labels : this.selected_labels,
      isHidden:false
    }
    this.addNote(newNote);
    this.showCreatePanel = false;
    this.resetNote();

  }

  addNote(note){
    this.noteService.addNotes(note);
  }

  

  addLabelToNote(e){
    
    if(e.target.checked){
      console.log("Adding label to note id :",e.target.value);
      this.selected_labels.push(e.target.value);
    }else{
     this.selected_labels = this.selected_labels.filter(label=>{
        console.log(label,e.target.value)
        return e.target.value !=label
      })
    }

    console.log(this.selected_labels)
    
  }

  resetNote(){
    this.title.reset();
    this.content.reset();
    this.selected_labels = [];
  }



}
