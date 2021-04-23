// SPDX-License-Identifier: Apache-2.0
import { CREDS } from './../app.cred';
import { Header } from './../header/header.po';
import { LoginPage } from './login.po';
import { DataCallListPage } from '../dataCallList/dataCallList.po';

describe('Login Page ', () => {
  let loginpage: LoginPage;
  let datacalllistpage: DataCallListPage;
  let header: Header;

  beforeEach(() => {
    loginpage = new LoginPage();
    datacalllistpage = new DataCallListPage();
    header = new Header();
  });

  it('User should see the login page first', () => {
    loginpage.navigateTo();
    loginpage.getTitleText();
    loginpage.maximizeBrowser();
  });

  it('User should be able to log in as a carrier, see the correct branding and then logout successfully', () => {
    loginpage.fillCorrectCreds(CREDS.carrFcCreds);
    expect(header.getBrandingImage()).toContain('assets/images/car-faircover.png');
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    header.appLogout();
    expect(loginpage.getTitleText()).toEqual('Sign In');
  });
});
