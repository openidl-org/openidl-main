/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';
import { UTIL } from './../util';

export class DataCallListPage {
  navigateTo() {
    return browser.get('/datacallList');
  }

  getTitleText() {
    return element(by.css('app-datacall-list h1')).getText();
  }

  showDatacallDrafts() {
    element(by.css('ul.nav-tabs>li.nav-item:nth-child(1)>a')).click();
    browser.waitForAngular();
  }

  showDatacallIssued() {
    element(by.css('ul.nav-tabs>li.nav-item:nth-child(2)>a')).click();
    browser.waitForAngular();
  }

  showDatacallAbandoned() {
    element(by.css('ul.nav-tabs>li.nav-item:nth-child(3)>a')).click();
    browser.waitForAngular();
  }

  checkActiveClass(selector) {
    return UTIL.hasClass(element(by.css(selector)), 'active');
  }
}
