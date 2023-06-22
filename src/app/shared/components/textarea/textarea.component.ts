import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() size?: 'fieldLabelLarge' | 'fieldLabelSmall' | 'fieldLabelMedium' | '' = '';
  @Input() rows?: string;
  @Input() cols?: string;
  @Input() placeholder?: string;
  @Input() control!: FormControl;
}
