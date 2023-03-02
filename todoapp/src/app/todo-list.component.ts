import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Tasks } from './types/task';

@Component({
    selector: 'app-todo-list',
    template: `
        <ul>
            <li *ngFor="let item of tasks">
                <label>
                    <input 
                        type="checkbox" 
                        id="item-{{ item.id }}" 
                        [checked]="item.done" 
                        (change)="toggle(item.id)"
                    />
                    {{ item.text }}
                </label>
                <a routerLink="/{{ item.id }}/details">Details</a>
            </li>
        </ul>
    `
})
export class TodoListComponent {
    @Input()
    tasks: Tasks = []; 

    @Output()
    onToggle = new EventEmitter<number>();

    toggle(id: number){
        this.onToggle.emit(id);
    }
}