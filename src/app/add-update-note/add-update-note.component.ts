import { Component, OnInit, HostListener, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note } from '../model/note';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-update-note',
  templateUrl: './add-update-note.component.html',
  styleUrls: ['./add-update-note.component.scss']
})
export class AddUpdateNoteComponent implements OnInit {

  title = new FormControl('');
  content = new FormControl('');
  labelName = new FormControl('');

  showTitleInput: boolean = false;
  showPanel: boolean = true;
  showCreateLabel: boolean = false;


  colors: string[] = ['#DAF7A6', '#FFC300', '#F7AA9D', '#9DE5F7', '#9DA6F7', '#F6B2EC']

  note: Note;

  // list of available labels
  labels: any[] = [];
  selected_labels: String[] = [];
  selected_color: string = "white";

  @Input()
  isEditNoteActive: boolean;

  @HostListener('document:click', ['$event'])
  clickOutside(e) {
    console.log(this.elref.nativeElement,e.target,this.elref.nativeElement.contains(e.target))
    if(this.elref.nativeElement.contains(e.target)){
      console.log("inside")
    }else if ((e.target.id === "takeNote")) {
      this.noteService.showPanel(true);

    } else {
      console.log('outside')
      this.noteService.showPanel(false);
    }

  }

  constructor(private noteService: NoteService, private modalService: BsModalService,private elref:ElementRef) {

  }

  ngOnInit() {
    this.noteService.isEditActive.subscribe(data => {
      this.isEditNoteActive = data;
    })

    if (this.isEditNoteActive) {
      this.getNote();
    } else {
      this.createNote();
      this.getAllLabels();
    }

    

  }
  // Create an empty note with default values
  createNote() {
    this.note = <Note>{
      title: this.title.value,
      content: this.content.value,
      id: Math.random(),
      color: "white",
      labels: this.selected_labels,
      isHidden: false
    }
  }

  // Get all the available labels
  getAllLabels() {
    this.labels = this.noteService.getAllLabels().map((e) => {
      let label = {
        value: e,
        checked: false
      }
      return label
    })
  }


  // Create new label and add to the note
  createLabel() {

    // checking for ex

    let label: any = {}
    label.checked = true;
    label.value = this.labelName.value;

    this.note.labels.unshift(label.value);
    this.labels.unshift(label);

    // Save label to storage
    this.noteService.addLabel(this.labelName.value);

    // Reset label input 
    this.labelName.reset();
    this.showCreateLabel = false;
  }

  // add selected label from dropdown to the note
  addLabelToNote(e) {

    if (e.target.checked) {
      this.note.labels.push(e.target.value);
    } else {
      this.note.labels = this.note.labels.filter(label => {
        return e.target.value != label
      })
    }
    
  }


  togglePanel() {
    this.showPanel = !this.showPanel;
    this.noteService.showPanel(this.showPanel);
  }


  getNote() {
    let note = this.noteService.getNote();
    this.note = note;

    this.title.setValue(note.title);
    this.content.setValue(note.content);

    // get selected and other labels
    this.noteService.getAllLabels().forEach(el => {
      let label: any = {};
      label.value = el;
      label.checked = false;
      this.note.labels.forEach(el2 => {
        if (el === el2) {
          label.checked = true;
        }
      })
      this.labels.push(label)
    });




    //this.selected_labels = note.labels;
  }

  toogleCreateLabel() {
    this.showCreateLabel = true;
    this.noteService.filtered_labels.subscribe(data=>{
       if(data.length>0){
         this.showCreateLabel = false
       }
    })
   // this.showCreateLabel = true;
  }

  toggleTitle() {
    this.showTitleInput = !this.showTitleInput;
  }

  addColorToNote(color) {
    this.note.color = color;
  }



  updateNote() {
    this.note = <Note>{
      title: this.title.value,
      content: this.content.value,
      id: this.note.id,
      color: this.note.color,
      labels: this.note.labels
    }
    //this.noteService.updateNote(note);
  }



  updateOrCreateNote() {
    this.note = <Note>{
      title: this.title.value,
      content: this.content.value,
      id: this.note.id,
      color: this.note.color,
      labels: this.note.labels
    }
    this.noteService.updateNote(this.note);
    this.resetNote();
    this.togglePanel();
    this.noteService.toogleEdit(false);
    this.modalService.hide(1);

  }

  resetNote() {
    this.title.reset();
    this.content.reset();
  }

}
