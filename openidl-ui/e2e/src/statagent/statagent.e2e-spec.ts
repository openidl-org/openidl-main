/**
 SPDX-License-Identifier: Apache-2.0
*/
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from '../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { StatAgent } from '../statagent/statagent.po';

describe('Stat agent - Like , Unlike a data call and set forum url for a data call in draft state', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let statagent: StatAgent;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
    statagent = new StatAgent();
  });

  it('Should be able to login and open a data call in draft mode', () => {
    loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.saCreds);
    statagent.openDatacallDraft();
  });

  it('Should be able to like a data call in draft mode', () => {
    statagent.likeDatacall();
    expect(statagent.checkForSuccess()).toBeTruthy();
    statagent.closeModal();
  });

  it('Should be able to unlike a data call in draft mode', () => {
    statagent.unlikeDatacall();
    expect(statagent.checkForSuccess()).toBeTruthy();
    statagent.closeModal();
  });

  it('Should be able to set forum url for a data call in draft mode', () => {
    statagent.setForumURL();
    expect(statagent.checkForSuccess()).toBeTruthy();
    statagent.closeModal();
  });

});

describe('Stat Agent - Update Delivery date, forum URL for an issued data call, update report and view drafts ', () => {
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let statagent: StatAgent;

  beforeEach(() => {
    datacalllistpage = new DataCallListPage();
    header = new Header();
    statagent = new StatAgent();
  });

  it('Should open an issued data call', () => {
    header.clickOnDataCallList();
    datacalllistpage.showDatacallIssued();
    statagent.openDatacallIssued();
  });

  it('Should be able to update delivery date and forum URL', () => {
    statagent.updateDeliveryDateAndForumURL();
    expect(statagent.checkForSuccess()).toBeTruthy();
    statagent.closeModal();
  });

  it('Should update report for an issued data call', () => {
    statagent.updateReport();
    expect(statagent.checkForSuccess()).toBeTruthy();
    statagent.closeModal();
  });

  it('Should be able to see draft versions of an issued data call', () => {
    statagent.viewDrafts();
    expect(statagent.getIssuedDatacallTitleText()).toEqual('Issued Data Call');
    header.appLogout();
  });
});
