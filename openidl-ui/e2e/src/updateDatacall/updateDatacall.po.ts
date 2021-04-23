/**
 SPDX-License-Identifier: Apache-2.0
*/
import { UTIL } from './../util';
import { browser, by, element, $$ } from 'protractor';

export class UpdateDatacall {
  openUpdateDatacall() {
    browser.waitForAngular();
    // const datacalls = element.all(by.css('.table>tbody:first-child>tr'));
    // // $$('.table>tbody:first-child>tr');
    // console.log('datacalls : ', datacalls);
    // datacalls.each((row) => {
    //   const rowElems = row.$$('td');
    //   console.log('element::: ', rowElems.get(0).getText());
    //   if (expect(rowElems.get(0).getText()).toMatch('Data call UI automation test')) {
    //     rowElems.get(0).click();
    //   }
    // });
    element(by.cssContainingText('table tbody tr td', 'Data call UI automation test')).click();
    browser.waitForAngular();
  }

  saveNewDraftWithNoChange() {
    element(by.css('.save-draft')).click();
    browser.waitForAngular();
  }

  updateDatacall() {
    element(by.css('#name')).sendKeys('v2');
    element(by.css('[name="comments"]')).sendKeys('version 2');
    element(by.css('.save-draft')).click();
    browser.waitForAngular();
  }

  issueDatacall() {
    element(by.css('.issue')).click();
    browser.waitForAngular();
  }

  abandonDatacall() {
    element(by.css('.abandon')).click();
    browser.waitForAngular();
  }

  cloneDatacall() {
    element(by.css('.clone')).click();
    browser.waitForAngular();
  }

  getTitleTextOfCloned() {
    return element(by.css('.page-heading')).getText();
  }

  getSuccessModal() {
    browser.sleep(1000);
    browser.waitForAngular();
    return UTIL.hasClass(element(by.css('.modal-body')), 'success');
  }

  getNoChangeErrorModal() {
    browser.waitForAngular();
    return UTIL.hasClass(element(by.css('.modal-body')), 'error');
  }

  getNoChangeErrorText() {
    browser.waitForAngular();
    return element(by.css('.modal-body h1')).getText();
  }

  closeModal() {
    element(by.css('.modal-body .close')).click();
  }
}
