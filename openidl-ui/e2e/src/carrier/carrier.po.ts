/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';
import { UTIL } from './../util';

export class Carrier {

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

  consentDatacall() {
    browser.waitForAngular();
    element(by.cssContainingText('.btn-container .btn-primary', 'Consent to the Report')).click();
    browser.waitForAngular();
  }

  viewDrafts() {
    element(by.cssContainingText('.btn-secondary', 'View Draft Versions')).click();
    browser.waitForAngular();
  }

  getIssuedDatacallTitleText() {
    browser.waitForAngular();
    return element(by.css('.side-checked .draft-span span strong')).getText();
  }

  viewPublishedReport() {
    browser.waitForAngular();
    element(by.cssContainingText('table tbody tr td', 'Published')).click();
    browser.waitForAngular();
  }

  getPublishedText() {
  return element(by.cssContainingText('table tbody tr td', 'Published'));
  }

  checkForSuccess() {
    return UTIL.getSuccessModal();
  }

  closeModal() {
    UTIL.closeModal();
  }

}
