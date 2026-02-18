import { Component } from "@angular/core";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    constructor() {}

    scrollToProjects() {
        const el = document.getElementById('projects');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }
}