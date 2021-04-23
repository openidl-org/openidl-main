/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';
import { UTIL } from './../util';

export class StatAgent {

  openDatacallDraft() {
    UTIL.openDatacallDraft();
    browser.waitForAngular();
  }

  openDatacallIssued() {
    UTIL.openDatacallIssued();
    browser.waitForAngular();
  }

  likeDatacall() {
    browser.waitForAngular();
    element(by.css('.sub-col .btn-primary')).click();
    browser.waitForAngular();
  }

  unlikeDatacall() {
    browser.waitForAngular();
    element(by.css('.sub-col .btn-secondary')).click();
    browser.waitForAngular();
  }

  setForumURL() {
    element(by.css('.forum #name')).sendKeys('https://google.com');
    element(by.css('.forum .updateBtn')).click();
    browser.waitForAngular();
  }

  updateDeliveryDateAndForumURL() {
    browser.waitForAngular();
    element(by.css('[formcontrolname = "proposedDeliveryDate"]')).sendKeys('06/01/2019');
    element(by.css('[formcontrolname="forumUrl"]')).sendKeys('https://google.com');
    element(by.css('.datebtn > .btn-primary')).click();
    browser.waitForAngular();
  }

  updateReport() {
    browser.waitForAngular();
    const hash = UTIL.getHash();
    element(by.css('[formcontrolname = "reportURL"]')).sendKeys('test.com');
    element(by.css('[formcontrolname="reportHash"]')).sendKeys(hash);
    element(by.css('.statusText > .update')).click();
    browser.waitForAngular();
  }

  viewDrafts() {
    element(by.css('.sub-col .btn-secondary')).click();
    browser.waitForAngular();
  }

  getIssuedDatacallTitleText() {
    browser.waitForAngular();
    return element(by.css('.side-checked .draft-span span strong')).getText();
  }

  checkForSuccess() {
    return UTIL.getSuccessModal();
  }

  closeModal() {
    UTIL.closeModal();
  }

}
