import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

    @Output() buttonClicked = new EventEmitter();

    onButtonClicked() {
        this.buttonClicked.emit();
    }

    constructor() { }

    ngOnInit(): void {
    }

}
