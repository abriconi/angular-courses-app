import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})

export class InputComponent {
  @Input() size?: 'fieldLabelLarge' | 'fieldLabelSmall' | 'fieldLabelMedium' | '' = '';
  @Input() placeholder?: string;
  @Input() control!: FormControl;
  @Input() type?: 'date' | 'text' = 'text';
}
