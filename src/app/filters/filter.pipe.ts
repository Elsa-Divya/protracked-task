import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class FilterPipe implements PipeTransform {

  transform(items:any[],value:any): any {
   

    if(items.length<=0){
      return items
    }else if(!value){
      return items
    }else{
      value = value.toLowerCase();
    return  items.filter(e=>{
        if(e.title.toLowerCase().includes(value) || e.content.toLowerCase().includes(value) || this.searchLabel(e.labels,value)){
          return e
        }
      })
    }
  }

  searchLabel(labels,label){
    if(labels.findIndex(e => e.toLowerCase().includes(label)) > 0){
      return true
    }
    return false
  }

}
