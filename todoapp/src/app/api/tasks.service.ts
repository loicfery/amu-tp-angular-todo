import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tasks } from "../types/task";

const SUPABASE_URL = 'https://wnqqncbgkhbfmebiilzx.supabase.co/rest/v1/todos';
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducXFuY2Jna2hiZm1lYmlpbHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MDUwNjgsImV4cCI6MTk5MzA4MTA2OH0.IPXh0bVT5ODMQ1KKrTLttJvcduaWo2yAiXZcBHidk4I";

@Injectable()
export class TasksService {
    constructor(private http: HttpClient){}

    findAll(): Observable<Tasks> {
        return this.http.get<Tasks>(SUPABASE_URL, {
            headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_API_KEY
            }
        });
    }

    findOne(id: number): Observable<Tasks> {
        return this.http.get<Tasks>(SUPABASE_URL + '?id=eq.' + id, {
            headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_API_KEY,
                Prefer: "return=representation"
            }
        });
    }

    toggleDone(id: number, isDone: boolean): Observable<Tasks> {
        return this.http.patch<Tasks>(SUPABASE_URL + '?id=eq.' + id, {
            done: isDone
        }, {
            headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_API_KEY,
                Prefer: "return=representation"
            }
        });
    }

    create(text: string): Observable<Tasks> {
        return this.http.post<Tasks>(SUPABASE_URL, {
            text: text,
            done: false
        }, {
            headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_API_KEY,
                Prefer: "return=representation"
            }
        });
    }
}