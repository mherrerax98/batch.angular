import { Component, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-con-color',
  templateUrl: './text-con-color.component.html',
  styleUrls: ['./text-con-color.component.scss']
})
export class TextConColorComponent  {
  @Input() text?: string;
  @Input() color?: string = '#59ff04';

  constructor(){}
  
}

@NgModule({
  declarations: [TextConColorComponent],
  imports: [],
  providers: [],
  exports: [TextConColorComponent]
})
export class TextConColorModule {}
