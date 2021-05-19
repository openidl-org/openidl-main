/**
 SPDX-License-Identifier: Apache-2.0
*/
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from '../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { UpdateDatacall } from '../updateDatacall/updateDatacall.po';

describe('Update Data Call Page', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;
  let updatedatacallpage: UpdateDatacall;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
    updatedatacallpage = new UpdateDatacall();
    loginpage.maximizeBrowser();
  });

  it('Should open the update data call screen by clicking on the data call in draft mode when a regulator has logged in.', () => {
    loginpage.navigateTo();
    loginpage.fillCorrectCreds(CREDS.regOhioCreds);
    // datacalllistpage.navigateTo();
    updatedatacallpage.openUpdateDatacall();
  });

  it('Should get error popup of can not save a new draft if clicked save new draft button without changing the field values', () => {
    updatedatacallpage.saveNewDraftWithNoChange();
    expect(updatedatacallpage.getNoChangeErrorModal()).toBeTruthy();
    expect(updatedatacallpage.getNoChangeErrorText()).toEqual('Can not save a new draft');
    updatedatacallpage.closeModal();
  });

  it('Should be able to update the data call to new draft version.', () => {
    updatedatacallpage.updateDatacall();
    expect(updatedatacallpage.getSuccessModal()).toBeTruthy();
    updatedatacallpage.closeModal();
  });

  it('Should be able to issue the current draft version of data call', () => {
    updatedatacallpage.issueDatacall();
    expect(updatedatacallpage.getSuccessModal()).toBeTruthy();
    updatedatacallpage.closeModal();
  });

  it('Should be able to clone the data call', () => {
    updatedatacallpage.openUpdateDatacall();
    updatedatacallpage.cloneDatacall();
    expect(updatedatacallpage.getTitleTextOfCloned()).toEqual('Clone Data Call');
    header.clickOnDataCallList();
  });

  it('Should be able to abandon a data call in draft mode', () => {
    updatedatacallpage.openUpdateDatacall();
    updatedatacallpage.abandonDatacall();
    expect(updatedatacallpage.getSuccessModal()).toBeTruthy();
    updatedatacallpage.closeModal();
  });

});
