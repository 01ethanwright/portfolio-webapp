import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    created_at: string;
    updated_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private apiUrl = 'https://api.github.com'

    constructor(private http: HttpClient) {}

    getUserRepos(username: string): Observable<GitHubRepo[]> {
        return this.http.get<GitHubRepo[]>(
           `${this.apiUrl}/users/${username}/repos?sort=updated&per_page=100` 
        );
    }
}