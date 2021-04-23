/**
 SPDX-License-Identifier: Apache-2.0
*/
import { DATATOCREATE } from './../dataToCreate';
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from './../login/login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';
import { CreateDatacallPage} from './createDatacall.po';

describe('Create Data Call page', () => {
    let loginpage: LoginPage;
    let datacalllistpage: DataCallListPage;
    let header: Header;
    let createdatacallpage: CreateDatacallPage;

    beforeEach(() => {
        loginpage = new LoginPage();
        datacalllistpage = new DataCallListPage();
        header = new Header();
        createdatacallpage = new CreateDatacallPage();
        loginpage.maximizeBrowser();
    });

    it('Should navigate to Create Data Call on clicking the New Data Call menu', () => {
        loginpage.navigateTo();
        loginpage.fillCorrectCreds(CREDS.regOhioCreds);
        header.clickOnNewDataCall();
        expect(createdatacallpage.getTitleText()).toEqual('Create Data Call');
    });

    it('Should show error if user tries to save the draft without filling the required fields', () => {
        expect(createdatacallpage.getErrorText()).toContain('Error');
        createdatacallpage.closeErrorNotification();
    });

    it('Should save the draft and show success', () => {
      createdatacallpage.saveDraft(DATATOCREATE);
      expect(createdatacallpage.getSuccessModal()).toBeTruthy();
      createdatacallpage.closeModal();
    });

    it('Should issue the data call and show success', () => {
      header.clickOnNewDataCall();
      expect(createdatacallpage.getTitleText()).toEqual('Create Data Call');
      createdatacallpage.issueDatacall(DATATOCREATE);
      expect(createdatacallpage.getSuccessModal()).toBeTruthy();
      createdatacallpage.closeModal();
    });

    it('Should create a data call draft which will be issued', () => {
      header.clickOnNewDataCall();
      createdatacallpage.saveDraft(DATATOCREATE);
      expect(createdatacallpage.getSuccessModal()).toBeTruthy();
      createdatacallpage.closeModal();
    });

    it('Should create a data call draft which will be abandoned', () => {
      header.clickOnNewDataCall();
      createdatacallpage.saveDraft(DATATOCREATE);
      expect(createdatacallpage.getSuccessModal()).toBeTruthy();
      createdatacallpage.closeModal();
    });
});
