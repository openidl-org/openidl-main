// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/login/login.e2e-spec.ts',
     './src/dataCallList/dataCallList.e2e-spec.ts',
     './src/createDatacall/createDatacall.e2e-spec.ts',
     './src/updateDatacall/updateDatacall.e2e-spec.ts',
    './src/statagent/statagent.e2e-spec.ts',
    './src/report/report.e2e-spec.ts',
    './src/carrier/carrier.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
