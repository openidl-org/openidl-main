/**
 SPDX-License-Identifier: Apache-2.0
*/
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from '../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { browser } from 'protractor';

describe('Data Call List page', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
  });

  it('Regulator should be able to see data calls in draft, issed and abandoned state', () => {
    loginpage.navigateTo();
    browser.waitForAngular();
    loginpage.fillCorrectCreds(CREDS.regOhioCreds);
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    datacalllistpage.showDatacallAbandoned();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(3)')).toBeTruthy();
    datacalllistpage.showDatacallIssued();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(2)')).toBeTruthy();
    datacalllistpage.showDatacallDrafts();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(1)')).toBeTruthy();
    header.appLogout();
    browser.waitForAngular();
  });

  it('Stat Agent should be able to see data calls in draft, issed and abandoned state', () => {
    // loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.saCreds);
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    datacalllistpage.showDatacallAbandoned();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(3)')).toBeTruthy();
    datacalllistpage.showDatacallIssued();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(2)')).toBeTruthy();
    datacalllistpage.showDatacallDrafts();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(1)')).toBeTruthy();
    header.appLogout();
  });

  it('Carrier should be able to see data calls in draft, issed and abandoned state', () => {
    // loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.carrHfCreds);
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    datacalllistpage.showDatacallAbandoned();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(3)')).toBeTruthy();
    datacalllistpage.showDatacallIssued();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(2)')).toBeTruthy();
    datacalllistpage.showDatacallDrafts();
    expect(datacalllistpage.checkActiveClass('ul.nav-tabs>li.nav-item:nth-child(1)')).toBeTruthy();
    header.appLogout();
  });
});
