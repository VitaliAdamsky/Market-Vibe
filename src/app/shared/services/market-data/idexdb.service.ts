// src/app/utils/indexed-db.service.ts
import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';
import { MarketData } from '../../models/market-data';

interface MarketDB extends DBSchema {
  'market-data': {
    key: string;
    value: MarketData;
  };
}

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbPromise = openDB<MarketDB>('MarketDataDB', 1, {
    upgrade(db) {
      db.createObjectStore('market-data');
    },
  });

  async get(key: string) {
    const db = await this.dbPromise;
    return db.get('market-data', key);
  }

  async set(key: string, value: MarketDB['market-data']['value']) {
    const db = await this.dbPromise;
    await db.put('market-data', value, key);
  }

  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear('market-data');
  }
}
