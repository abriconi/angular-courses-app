import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input()
  courseName!: string;
  @Input() onCloseModal!: () => void;

  onConfirm() {
    console.log('confirm');

  }
  onCancel() {
    console.log('cancel');

  }
}
