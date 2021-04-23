/**
 SPDX-License-Identifier: Apache-2.0
*/
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

  it('User should get error notification if entered wrong credentials', () => {
    loginpage.fillWrongCreds(CREDS.wrongCreds);
    expect(loginpage.getErrorText()).toEqual('Could not login due to invalid credentials');
  });

  it('User should be able to log in as an Ohio regulator, see the correct branding and then logout successfully', () => {
    loginpage.fillCorrectCreds(CREDS.regOhioCreds);
    expect(header.getBrandingImage()).toContain('assets/images/reg-ohio-doi.png');
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    header.appLogout();
    expect(loginpage.getTitleText()).toEqual('Sign In');
  });

  it('User should be able to log in as an Colorado regulator, see the correct branding and then logout successfully', () => {
    loginpage.fillCorrectCreds(CREDS.regColoCreds);
    expect(header.getBrandingImage()).toContain('assets/images/reg-colorado-doi.png');
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    header.appLogout();
    expect(loginpage.getTitleText()).toEqual('Sign In');
  });

  it('User should be able to log in as an AAIS stat agent, see the correct branding and then logout successfully', () => {
    loginpage.fillCorrectCreds(CREDS.saCreds);
    expect(header.getBrandingImage()).toContain('assets/images/statag-aais.png');
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    header.appLogout();
    expect(loginpage.getTitleText()).toEqual('Sign In');
  });

  it('User should be able to log in as a carrier, see the correct branding and then logout successfully', () => {
    loginpage.fillCorrectCreds(CREDS.carrHfCreds);
    expect(header.getBrandingImage()).toContain('assets/images/car-hartford.png');
    expect(datacalllistpage.getTitleText()).toEqual('Data Call List');
    header.appLogout();
    expect(loginpage.getTitleText()).toEqual('Sign In');
  });
});
