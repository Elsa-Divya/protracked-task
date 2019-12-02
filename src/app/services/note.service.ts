import { Injectable } from '@angular/core';
import { Note } from '../model/note';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public notes:Note[] = [];
  public selectedNote:Note;
  public labels:string[] = [];

  private filteredNotes = new Subject<Note[]>();

  private toogleNoteCreation = new BehaviorSubject<boolean>(false);
  isPanelOpen = this.toogleNoteCreation.asObservable();

  private editNote = new BehaviorSubject<boolean>(false);
  isEditActive = this.editNote.asObservable();

  private addLabels = new BehaviorSubject<any>(null);
  getLabels = this.addLabels.asObservable();

  private toogleLabelCreation = new BehaviorSubject<boolean>(false);
  createLabel = this.toogleLabelCreation.asObservable();

  private s = new BehaviorSubject<any>([]);
  filtered_labels = this.s.asObservable();

  $notesSubject = new BehaviorSubject<Note[]>([]);
  



  constructor() { }

  getNotes(label?){
    let filteredNotes = [];

    this.notes = JSON.parse(localStorage.getItem("notes")) || [];

    if(label){
      filteredNotes = this.notes.filter(e=>{
          if(e.labels.findIndex(val=>label===val)>-1){
              return true
          }
      })
    }else{
      filteredNotes = this.notes;
    }

    console.log(filteredNotes,label)
   
    // let filteredNotes = []
    // if(label){
    //   filteredNotes = this.notes.filter(e=>{
    //   return e.labels  
    //   }).filter(label=>{
    //     return label == label
    //   })
    // }
    // this.filteredNotes.next(filteredNotes)
    this.$notesSubject.next(filteredNotes);
    return this.$notesSubject.asObservable();
  }

  getFilteredNotes(label){
    this.getNotes(label);
    return this.filteredNotes.asObservable();
    
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

  filterLabel(list){
    this.s.next(list);
  }

  enableCreateLabel(enable){
    this.toogleLabelCreation.next(enable);
  }

  addLabel(label){
    let all_labels = this.getAllLabels();
    all_labels.push(label);
    localStorage.setItem("labels",JSON.stringify(all_labels));
    this.addLabels.next(label);
  }

}
