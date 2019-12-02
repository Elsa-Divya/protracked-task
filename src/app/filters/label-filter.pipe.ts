import { Pipe, PipeTransform } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'labelFilter'
})
export class LabelFilterPipe implements PipeTransform {



  constructor(private noteService: NoteService) {

  }

  transform(items: any[], value: any): any {

    let avl_labels: any = [];

    if (items.length <= 0) {
      avl_labels = []
    } else if (!value) {
      avl_labels = items
    } else {
      value = value.toLowerCase();

      avl_labels = items.filter(e => {
        if (e.value.toLowerCase().includes(value)) {
          return e
        }
      })
    }
    console.log(avl_labels)
    this.noteService.filterLabel(avl_labels);

    return avl_labels;

  }

}
