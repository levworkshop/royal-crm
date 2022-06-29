import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() label = ''; // =this is my button label

    constructor() { }

    ngOnInit(): void {
    }

    buttonClick() {
        console.log('this button was clicked');
    }

}
