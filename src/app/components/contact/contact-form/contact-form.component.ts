import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './contact-form.component.html',
    styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    contactForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
        });
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    submit() {
        if (this.contactForm.valid) {
            // Handle form submission
            console.log(this.contactForm.value);
            this.close();
        } else {
            this.contactForm.markAllAsTouched();
        }
    }
}