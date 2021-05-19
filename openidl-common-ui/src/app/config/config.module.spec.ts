// SPDX-License-Identifier: Apache-2.0
import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  let configModule: ConfigModule;

  beforeEach(() => {
    configModule = new ConfigModule();
  });

  it('should create an instance', () => {
    expect(configModule).toBeTruthy();
  });
});
