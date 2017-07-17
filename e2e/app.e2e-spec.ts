import { ByMileInsurancePage } from './app.po';

describe('by-mile-insurance App', () => {
  let page: ByMileInsurancePage;

  beforeEach(() => {
    page = new ByMileInsurancePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
