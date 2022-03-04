import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'skp-search',
  templateUrl: './search.component.html'

})
export class SearchComponent implements OnInit,OnDestroy{

  debounce: Subject<string> = new Subject<string>();
  @Input() value: string = '';
  @Output() onTyping = new EventEmitter<string>();

  onKeyUp(target : any) {
    if(target instanceof EventTarget) {
      let element = target as HTMLInputElement;
      this.debounce.next(element.value)
    }
  }

  ngOnInit(): void {
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.onTyping.emit(filter));
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

}
