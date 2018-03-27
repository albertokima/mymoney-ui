import { MymoneyUiPage } from './app.po';

describe('mymoney-ui App', () => {
  let page: MymoneyUiPage;

  beforeEach(() => {
    page = new MymoneyUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
