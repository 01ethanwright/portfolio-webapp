import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    menuOpen = false;

    constructor() {}

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    scrollTo(section: string) {
        const el = document.getElementById(section);
        if (el) {
            const navbarHeight = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        this.menuOpen = false;
    }
}
