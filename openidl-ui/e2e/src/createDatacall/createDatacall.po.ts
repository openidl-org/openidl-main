/**
 SPDX-License-Identifier: Apache-2.0
*/
import { UTIL } from './../util';
import { browser, by, element } from 'protractor';

export class CreateDatacallPage {
    navigateTo() {
        return browser.get('/createDatacall');
    }

    getTitleText() {
        return element(by.css('.page-heading')).getText();
    }

    getErrorText() {
        element(by.css('.btn-secondary')).click();
        return element(by.css('.notify-container')).getText();
    }

    closeErrorNotification() {
      element(by.css('.notify-container .close-btn')).click();
    }

    saveDraft(data) {
      this.fillUpAllFields(data);
      element(by.css('.btn-container .btn-secondary')).click();
      browser.waitForAngular();
      browser.sleep(5000);
    }

    issueDatacall(data) {
      this.fillUpAllFields(data);
      element(by.css('.btn-container .btn-primary')).click();
      browser.waitForAngular();
      browser.sleep(5000);
    }

    fillUpAllFields(data) {
      browser.waitForAngular();
      element(by.id('name')).sendKeys(data.name);
      element(by.id('description')).sendKeys(data.description);


      element(by.css('[name="lossfromdate"]')).click();

      element(by.css('.owl-dt-calendar-body tr:first-child td:last-child>span.owl-dt-calendar-cell-content')).click();
      browser.sleep(2000);
      if (expect(element(by.css('.owl-dt-container-row')).isPresent()).toBeTruthy()) {
        element(by.css('.owl-dt-container-row')).click();
      }
      // if (expect(element(by.css('.owl-dt-popup')).isPresent()).toBeTruthy()) {
      //   element(by.css('.owl-dt-popup')).click();
      // }
      // if (expect(element(by.css('.owl-dt-container-inner')).isPresent()).toBeTruthy()) {
      //   element(by.css('.owl-dt-container-inner')).click();
      // }
      // if (element(by.css('.owl-dt-container')).isPresent()) {
      //   element(by.css('.owl-dt-container')).click();
      // }

      browser.waitForAngular();
      browser.sleep(2000);

      element(by.css('[name="losstoDate"]')).click();

      element(by.css('.owl-dt-calendar-body tr:last-child td:last-child>span.owl-dt-calendar-cell-content')).click();
      browser.sleep(2000);
      if (expect(element(by.css('.owl-dt-container-row')).isPresent()).toBeTruthy()) {
        element(by.css('.owl-dt-container-row')).click();
      }
      // if (expect(element(by.css('.owl-dt-popup')).isPresent()).toBeTruthy()) {
      //   element(by.css('.owl-dt-popup')).click();
      // }
      // if (expect(element(by.css('.owl-dt-container-inner')).isPresent()).toBeTruthy()) {
      //   element(by.css('.owl-dt-container-inner')).click();
      // }
      // if (element(by.css('.owl-dt-container')).isPresent()) {
      //   element(by.css('.owl-dt-container')).click();
      // }

      browser.waitForAngular();
      browser.sleep(2000);

      element(by.css('[name="deadline"]')).sendKeys(data.deadline);
      element(by.css('[name="purpose"]')).sendKeys(data.purpose);
      element(by.id('criteria')).sendKeys(data.detailedCriteria);
      element(by.id('eligibility')).sendKeys(data.eligibilityRequirement);
      browser.waitForAngular();
      browser.sleep(2000);
      UTIL.selectDropdownbyNum(element(by.css('[formcontrolname="business"]')), 1);
      UTIL.selectDropdownbyNum(element(by.css('[formcontrolname="intent"]')), 0);

    }

    getSuccessModal() {
      browser.sleep(1000);
      browser.waitForAngular();
      return UTIL.hasClass(element(by.css('.modal-body')), 'success');
    }

    closeModal() {
      element(by.css('.modal-body .close')).click();
    }

}
