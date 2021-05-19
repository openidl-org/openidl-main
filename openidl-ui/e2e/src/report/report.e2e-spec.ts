/**
 SPDX-License-Identifier: Apache-2.0
*/
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from '../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { Report } from '../report/report.po';
import { browser } from 'protractor';

describe('Reports - Accept and Publish', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let report: Report;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
    report = new Report();
  });

  it('Regulator should open a report in candidate state, accept and publish it', () => {
    loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.regOhioCreds);
    browser.waitForAngular();
    datacalllistpage.showDatacallIssued();
    report.openCandidateReport();
    report.acceptAndPublishReport();
    expect(report.getSuccessModal()).toBeTruthy();
    report.closeModal();
    header.appLogout();
  });
});
