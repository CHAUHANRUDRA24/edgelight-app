const { LicenseManager } = require('../src/license-manager');

async function test() {
  console.log('Testing LicenseManager with active Firebase config...');
  const lm = new LicenseManager();
  console.log('Firebase Config:', lm.getFirebaseConfig());
  
  const status = await lm.initialize();
  console.log('License status on init:', status);
  console.log('Hardware ID:', lm.getShortHWID());
  console.log('Authorized?', lm.isAuthorized());
  console.log('✅ LicenseManager initialized cleanly with Firebase config.');
}

test().catch(console.error);
