import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarType } from 'src/app/shared/models/snackbar-type';
import { IndexedDbService } from 'src/app/shared/services/market-data/idexdb.service';
import { COLORS } from 'src/consts/url-consts';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-admin-panel-one',
  templateUrl: './admin-panel-one.component.html',
  styleUrls: ['./admin-panel-one.component.css'],
})
export class AdminPanelOneComponent {
  actions = [
    { title: 'Colors', action: 'goToColors' },
    { title: 'Clear IndexDb Cache', action: 'clearIndexDbCache' },
  ];

  activeAction: string = 'clearIndexDbCache';
  constructor(
    private router: Router,
    private indexedDbService: IndexedDbService,
    private snackbarService: SnackbarService
  ) {}

  setActive(action: string) {
    this.activeAction = action;
    if (action == 'goToColors') {
      const url = this.router.serializeUrl(this.router.createUrlTree([COLORS]));
      window.open(url, '_blank');
    }
    if (action == 'clearIndexDbCache') {
      this.clearIndexDbCache();
    }
  }
  async clearIndexDbCache() {
    try {
      await this.indexedDbService.clearAll();
      this.snackbarService.showSnackBar(
        'IndexDb Cache cleared',
        '',
        3000,
        SnackbarType.Info
      );
    } catch (error) {
      this.snackbarService.showSnackBar(
        'Failed to clear IndexDb Cache',
        '',
        3000,
        SnackbarType.Error
      );
    }
  }
}
