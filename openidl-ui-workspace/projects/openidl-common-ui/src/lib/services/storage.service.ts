import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  // Get requested localstorage data
  getItem(key: string) {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (err) {
        // ignore
      }
    }
    return '';
  }

  // Set requested localstorage data
  setItem(key: string, object: any) {
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
