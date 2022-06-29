import { AfterViewInit, Component } from '@angular/core';
import { SessionService } from './core/session.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    constructor(private sessionService: SessionService) { }

    ngAfterViewInit(): void {
        this.sessionService.redirectToFirstPage();
    }
}
