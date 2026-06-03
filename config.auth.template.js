module.exports = {
  url: 'ldap://<address>:389',
  baseDN: 'DC=<>,DC=<>>',
  username: '<username>',
  password: '<password>',
  hostNames: { 'DEV' : '<dev>', 'QA' : '<qa>', 'PROD' : '<prod>' },
  passToken: '<token>',
  EXPIRES: 86400,
  AUTH_TYPE : 'NTLM',
  MOCKUP_USERS : ['acastellon'],
  MOCKUP_ROLES : ['User','Admin'],
  ROLES : {
    'User': '<LDAP> USER ',
    'Admin': '<LDAP> ADMINISTRATOR ',
    'Viewer': '<LDAP> VIEWER '
  }
};
