import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';

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
    submitted = false;
    loading = false;
    errorMsg = '';

    constructor(
        private fb: FormBuilder,
        private firestore: Firestore,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.minLength(10)]],
        });
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    async onSubmit() {
        if (this.contactForm.invalid) {
            this.contactForm.markAllAsTouched();
            return;
        }

        if (!isPlatformBrowser(this.platformId)) return;

        this.loading = true;
        this.errorMsg = '';

        try {
            const contactsRef = collection(this.firestore, 'contacts');
            await addDoc(contactsRef, {
                ...this.contactForm.value,
                createdAt: serverTimestamp()
            });
            this.submitted = true;
            this.contactForm.reset();
            this.close();
        } catch (error) {
            this.errorMsg = 'Something went wrong. Please try again.';
            console.error(error);
        } finally {
            this.loading = false;
        }
    }
}