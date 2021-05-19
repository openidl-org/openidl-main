/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';

export class LoginPage {

  maximizeBrowser() {
    browser.driver.manage().window().maximize();
  }

  navigateTo() {
    return browser.get('/');
  }

  fillCorrectCreds(creds: any) {
    element(by.css('[name="username"]')).sendKeys(creds.username);
    element(by.css('[name="password"]')).sendKeys(creds.password);
    element(by.css('.btn-login')).click();
  }

  fillWrongCreds(creds: any) {
    element(by.css('[name="username"]')).sendKeys(creds.username);
    element(by.css('[name="password"]')).sendKeys(creds.password);
    element(by.css('.btn-login')).click();
  }

  getTitleText() {
    return element(by.css('.text-heading')).getText();
  }

  getErrorText() {
    return element(by.css('.message')).getText();
  }

}
