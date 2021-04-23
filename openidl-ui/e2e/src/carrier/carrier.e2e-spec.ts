/**
 SPDX-License-Identifier: Apache-2.0
*/
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from '../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { Carrier } from '../carrier/carrier.po';

describe('Carrier - Like and Unlike a data call in draft state', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let carrier: Carrier;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
    carrier = new Carrier();
  });

  it('Should be able to login and open a data call in draft mode', () => {
    loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.carrHfCreds);
    carrier.openDatacallDraft();
  });

  it('Should be able to like a data call in draft mode', () => {
    carrier.likeDatacall();
    expect(carrier.checkForSuccess()).toBeTruthy();
    carrier.closeModal();
  });

  it('Should be able to unlike a data call in draft mode', () => {
    carrier.unlikeDatacall();
    expect(carrier.checkForSuccess()).toBeTruthy();
    carrier.closeModal();
  });

});

describe('Carrier - provide consent to an issued data call and view draft versions ', () => {
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let carrier: Carrier;

  beforeEach(() => {
    datacalllistpage = new DataCallListPage();
    header = new Header();
    carrier = new Carrier();
  });

  it('Should open an issued data call', () => {
    header.clickOnDataCallList();
    datacalllistpage.showDatacallIssued();
    carrier.openDatacallIssued();
  });

  it('Should provide consent to data call in issued state', () => {
    carrier.consentDatacall();
    expect(carrier.checkForSuccess()).toBeTruthy();
    carrier.closeModal();
  });

  it('Should be able to see drafts of an issued data call', () => {
    carrier.viewDrafts();
    expect(carrier.getIssuedDatacallTitleText()).toEqual('Issued Data Call');
  });

});

describe('Carrier: View published report', () => {
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let carrier: Carrier;

  beforeEach(() => {
    datacalllistpage = new DataCallListPage();
    header = new Header();
    carrier = new Carrier();
  });

  it('Should be able to view the published report', () => {
    header.clickOnDataCallList();
    datacalllistpage.showDatacallIssued();
    carrier.viewPublishedReport();
    expect(carrier.getPublishedText()).toBeTruthy();
  });

});
