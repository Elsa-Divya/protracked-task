import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public notes:Note[] = [];
  public selectedNote:Note;
  public labels:string[] = [];

  private toogleNoteCreation = new BehaviorSubject<boolean>(false);
  isPanelOpen = this.toogleNoteCreation.asObservable();

  private editNote = new BehaviorSubject<boolean>(false);
  isEditActive = this.editNote.asObservable();

  private addLabels = new BehaviorSubject<any>(null);
  getLabels = this.addLabels.asObservable();

  constructor() { }

  getNotes(){
  //  let notes: Note[] = [
  //     {title: 'Title', color: 'lightblue', content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",labels:["a","b"],lastUpdated:"",id:1},
  //     {title: '',  color: 'lightgreen',content:"",labels:["app","testing"],lastUpdated:"",id:133},
  //     {title: 'abvdff',  color: 'lightpink',content:"",labels:["testing app"],lastUpdated:"",id:1333}
  //   ];
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];

    return this.notes;
  }

  setNote(note){
    this.selectedNote = note;
  }

  getNote(){
    return this.selectedNote;
  }

  addNotes(note){
   this.notes.unshift(note);
  }

  updateNote(note){

   
    const index = this.notes.findIndex((e)=>{return (note.id===e.id)})

    if(index==-1){
      this.notes.unshift(note)
    }else{
      this.notes[index] = note
    }
    localStorage.setItem("notes",JSON.stringify(this.notes));
    console.log("update note",this.notes)
  }

  tooglePanel(showPanel){
    this.toogleNoteCreation.next(showPanel);
  }

  toogleEdit(isEditActive){
    this.editNote.next(isEditActive)
  }

  getAllLabels(){
    return JSON.parse(localStorage.getItem("labels"))|| []
  }

  addLabel(label){
   
    this.labels.push(label);
    console.log(this.labels)
    localStorage.setItem("labels",JSON.stringify(this.labels));
    this.addLabels.next(label);
  }

}
