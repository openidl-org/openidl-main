// SPDX-License-Identifier: Apache-2.0
import { browser, by, element } from 'protractor';
export const UTIL = {

  hasClass : (el, cls) => {
    return el.getAttribute('class').then(function (classes) {
      return classes.split(' ').indexOf(cls) !== -1;
    });
  },

  getSuccessModal: () => {
    browser.sleep(1000);
    browser.waitForAngular();
    return UTIL.hasClass(element(by.css('.modal-body')), 'success');
  },

  closeModal: () => {
    browser.waitForAngular();
    element(by.css('.modal-body .close')).click();
  },

  openDatacallDraft: () => {
    browser.waitForAngular();
    element(by.cssContainingText('table tbody tr td', 'Data call UI automation test')).click();
  },

  openDatacallIssued: () => {
    browser.waitForAngular();
    element(by.cssContainingText('table tbody tr td', 'Data call UI automation test')).click();
  }
};
