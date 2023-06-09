import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() variant: 'text' | 'filled' | 'linkSpecial' | 'icon' = 'text';
  @Input() size?: 'small' | 'large' | '' = '';
  @Input() color? : 'primary' | 'secondary' | 'tertiary' | ''  = '';
  @Input() icon?: string;
  @Input() onClick?: () => void | undefined;
}
