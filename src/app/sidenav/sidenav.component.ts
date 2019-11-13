import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  labels:string[] =[];

  constructor(private noteService:NoteService) { }

  ngOnInit() {
    this.getLabels();
    this.noteService.getLabels.subscribe(data=>{
      if(data!=null)
      this.labels.unshift(data);
    })
  }

  getLabels(){
   this.labels = this.noteService.getAllLabels()
  }

}
