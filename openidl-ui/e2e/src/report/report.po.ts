/**
 SPDX-License-Identifier: Apache-2.0
*/
import { browser, by, element } from 'protractor';
import { UTIL } from './../util';

export class Report {

  openCandidateReport() {
    browser.waitForAngular();
    element(by.cssContainingText('table tbody tr td', 'Candidate')).click();
    browser.waitForAngular();
  }

  acceptAndPublishReport() {
    browser.waitForAngular();
    element(by.cssContainingText('.btn-primary', 'Accept and Publish')).click();
    browser.waitForAngular();
  }

  getSuccessModal() {
    UTIL.getSuccessModal();
  }

  closeModal() {
    UTIL.closeModal();
  }

}
