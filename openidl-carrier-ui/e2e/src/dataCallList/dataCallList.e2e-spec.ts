// SPDX-License-Identifier: Apache-2.0
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

  it('Carrier should be able to see data calls in draft, issed and abandoned state', () => {
    // loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.carrFcCreds);
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
