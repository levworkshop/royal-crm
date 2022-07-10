import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { SessionService } from './core/session.service';
import { Theme, themeValues } from './shared/types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    themes: Array<Theme> = [{
        title: 'Light',
        value: 'light-theme'
    }, {
        title: 'Dark',
        value: 'dark-theme'
    }];

    selectedTheme: themeValues = 'light-theme';

    constructor(
        private sessionService: SessionService,
        private renderer: Renderer2
    ) { }

    ngAfterViewInit(): void {
        this.sessionService.redirectToFirstPage();
    }

    changeTheme() {
        this.renderer.removeAttribute(document.body, 'class');
        this.renderer.addClass(document.body, this.selectedTheme);
    }
}
