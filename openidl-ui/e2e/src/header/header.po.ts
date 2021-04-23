/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';

export class Header {
  getBrandingImage() {
    return element(by.css('header>div>img:last-child')).getAttribute('src');
  }

  clickOnNewDataCall() {
    browser.waitForAngular();
    element(by.css('.nav-container>ul>li:last-child>a')).click();
  }

  clickOnDataCallList() {
    browser.waitForAngular();
    element(by.css('.nav-container>ul>li:first-child>a')).click();
  }

  appLogout() {
    element(by.css('.logout-link')).click();
  }
}
