import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GithubService, GitHubRepo } from "../../services/github.service";

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{
    projects: GitHubRepo[] = [];
    loading = true;
    error = '';

    constructor(private githubService: GithubService) {}

    ngOnInit(): void {
        this.githubService.getUserRepos('01ethanwright').subscribe({
            next: (repos) => {
                this.projects = repos
                this.loading = false;
            },
            error: (error) => {
                this.error = 'Failed to load projects';
                this.loading = false;
                console.error(error)
            }
        });
    }
}