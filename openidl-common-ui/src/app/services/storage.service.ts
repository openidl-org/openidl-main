// SPDX-License-Identifier: Apache-2.0
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
   // Get requested localstorage data
   getItem(key: any) {
    return JSON.parse(localStorage.getItem(key));
  }

  // Set requested localstorage data
  setItem(key: any, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  clearStorage();
  // Clear all data stored in localStorage
  clearStorage() {
    localStorage.clear();
  }

  clearItem(key: any) {
    localStorage.removeItem(key);
  }

  // Remove an item from localStorage for the given key
  removeItem(key: any) {
    localStorage.removeItem(key);
  }
}
