import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-input-error',
  templateUrl: './label-input-error.component.html',
  styleUrls: ['./label-input-error.component.scss']
})
export class LabelInputErrorComponent implements OnInit {

  @Input("text") text: string = "";

  constructor() {
    
  }

  ngOnInit() {

  }
}
