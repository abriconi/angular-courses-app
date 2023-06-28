import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  @Input() courseName!: string;
  @Input() courseId!: number;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleDelete: EventEmitter<string> = new EventEmitter<string>();

  onCloseModal(): void {
    this.closeModal.emit();
  }

  onConfirm(): void {
    this.closeModal.emit();
    this.handleDelete.emit();
  }
}
