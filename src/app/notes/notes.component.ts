import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from '../model/note';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { NoteService } from '../services/note.service';
import { NoteComponent } from '../note/note.component';
import { AddUpdateNoteComponent } from '../add-update-note/add-update-note.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  showCreatePanel: boolean = false;
  showTitleInput: boolean = false;


  note: Note;
  title = new FormControl('');
  content = new FormControl('');
  selectedLabel = new FormControl();
  searchNote:string;

  notes:Note[]=[];

  labels: String[] = ["danger","testing"];
  selected_labels: String[] = [];

  modalRef:BsModalRef;

  constructor(private modalService:BsModalService,private noteService:NoteService) { }

  @ViewChild(AddUpdateNoteComponent,{static:false}) noteComp:AddUpdateNoteComponent;


  ngOnInit() {
    this.getNotes();
  }




  toggle(){
    this.showCreatePanel = !this.showCreatePanel;
  }

  toggleTitle(){
    this.showTitleInput = !this.showTitleInput;
  }

  getNotes(){   
    this.notes = this.noteService.getNotes();
    console.log(this.notes)
  }

  createNote(){
  
    let newNote:Note = <Note>{
      title : this.title.value,
      content : this.content.value,
      id : Math.random(),
      color:"white"
    }
 

    console.log(newNote);
    this.addNote(newNote);
    this.showCreatePanel = false;
    this.resetNote();

  }

  addNote(note){
    this.notes.unshift(note);
  }

  addColorToNote(){

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
  }

  editNote(note:Note){
    this.noteService.toogleEdit(true);
    note.isHidden = true;
    this.noteService.setNote(note);
    this.modalRef = this.modalService.show(AddUpdateNoteComponent);
    this.modalService.onHidden.subscribe(()=>{
      console.log('hide')
      note.isHidden = false;
      this.noteService.toogleEdit(false);
      this.noteService.tooglePanel(false);
      this.getNotes();
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }


}
