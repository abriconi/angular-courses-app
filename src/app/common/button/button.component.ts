import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText: string;
  @Input() className: string;
  @Input() iconSrc?: string;

  constructor() {
    this.buttonText = '';
    this.className = '';
    this.iconSrc = '';
  }
}
