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

  showPanel(showPanel){
    this.toogleNoteCreation.next(showPanel);
  }

  toogleEdit(isEditActive){
    this.editNote.next(isEditActive)
  }

  getAllLabels(){
    return JSON.parse(localStorage.getItem("labels"))|| []
  }

  addLabel(label){
    let all_labels = this.getAllLabels();

   // this.labels.push(label);
   // console.log(this.labels)
    all_labels.push(label);
    localStorage.setItem("labels",JSON.stringify(all_labels));
    this.addLabels.next(label);
  }

}
