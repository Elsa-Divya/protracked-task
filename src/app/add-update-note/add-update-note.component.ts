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
  label = new FormControl('');
  selectedLabel = new FormControl();
  showTitleInput: boolean = false;
  showPanel: boolean = true;
  showCreateLabel: boolean = false;


  colors: string[] = ['#DAF7A6', '#FFC300', '#F7AA9D', '#9DE5F7', '#9DA6F7', '#F6B2EC']

  note: Note;

  labels: any[] = [];
  selected_labels: String[] = [];
  selected_color: string = "white";

  @Input()
  isEditNoteActive: boolean;

  @HostListener('document:click', ['$event'])
  clickOutside(e) {
    if (this.elRef.nativeElement.contains(e.target)) {
      console.log('inside comp')
      //this.noteService.tooglePanel(false);
      //this.noteService.toogleEdit(false);
    } else if ((e.target.id === "takeNote")) {
      console.log('take note')
      this.noteService.tooglePanel(true);

    } else {
      console.log('outside comp and take note')
    }

  }

  constructor(private noteService: NoteService, private modalService: BsModalService, private elRef: ElementRef) {

  }

  togglePanel() {
    this.showPanel = !this.showPanel;
    this.noteService.tooglePanel(this.showPanel);
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

  createLabel() {
    let label: any = {}
    label.checked = true;
    label.value = this.label.value;

    this.note.labels.push(label.value);

    this.labels.push(label);
    this.noteService.addLabel(this.label.value);
    this.label.reset();
    this.showCreateLabel = false;




    console.log(this.labels)
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

    console.log(this.labels)


    //this.selected_labels = note.labels;
  }

  getAllLabels() {
    console.log(this.noteService.getAllLabels())
    this.labels = this.noteService.getAllLabels().map((e) => {
      let label = {
        value: e,
        checked: false
      }
      return label
    })
  }

  toogleCreateLabel() {
    this.showCreateLabel = true;
  }

  toggleTitle() {
    this.showTitleInput = !this.showTitleInput;
  }

  addColorToNote(color) {
    this.note.color = color;
  }

  addLabelToNote(e) {

    if (e.target.checked) {
      this.selected_labels.push(e.target.value);
    } else {
      this.selected_labels = this.selected_labels.filter(label => {
        return e.target.value != label
      })
    }
    this.note.labels = this.selected_labels;
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
    this.selected_labels = [];

  }

}
