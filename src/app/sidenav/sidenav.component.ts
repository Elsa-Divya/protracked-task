import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { NoteService } from '../services/note.service';
;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  labels:string[] =[];

  isAddOrEditActive:boolean = false;

  constructor(private noteService:NoteService) { }

  @Output()
  labelClicked = new EventEmitter<any>();

  ngOnInit() {
    this.getLabels();
    this.noteService.getLabels.subscribe(data=>{
      if(data!=null)
      this.labels.unshift(data);
    })

    this.noteService.isEditActive.subscribe(data=>{
      this.isAddOrEditActive = data
    })
  }

  getLabels(){
   this.labels = this.noteService.getAllLabels();
   
  }

  getNotes(label){
   this.noteService.getNotes(label);
  }

  

}
