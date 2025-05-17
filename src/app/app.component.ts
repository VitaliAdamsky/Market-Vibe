import { Component, ViewEncapsulation } from '@angular/core';
import { IconRegistryService } from '../services/general/icon-registry.service';
import { APP_ICONS } from '../assets/icons-library';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Market Vibe';
  constructor(private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons(APP_ICONS);
  }
}
