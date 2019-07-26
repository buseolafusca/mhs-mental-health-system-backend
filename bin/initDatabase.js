async function initDB() {
  var UserModel = require('../models/user')
  var bcrypt = require('bcryptjs');
  var enforcer = await require('../config/casbin');

  // add admin user
  var models = new UserModel({
    role: 'ADMIN',
    email: 'uk.nhs.noreply@gmail.com',
    password: '1234',
    first_name: 'Joseph',
    last_name: 'Connor'
  });
  models.save(async function(err) {
    await enforcer.addGroupingPolicy(models.id, "ADMIN");
    await enforcer.addPolicy(models.id, "users", models.id, "(GET)|(POST)|(PUT)|(DELETE)");
  });

  // questionnaires group
  await enforcer.addGroupingPolicy("FORM1", "QUESTIONNAIRE");
  await enforcer.addGroupingPolicy("FORM2", "QUESTIONNAIRE");

  // answers group
  await enforcer.addGroupingPolicy("FORM1ANSWER", "ANSWER");
  await enforcer.addGroupingPolicy("FORM2ANSWER", "ANSWER");

  // The rights of the admin
  await enforcer.addPolicy("ADMIN", "organisations", "TRUST", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("ADMIN", "users", "TRUSTMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("ADMIN", "questionnaires", "QUESTIONNAIRE", "(GET)|(POST)|(PUT)|(DELETE)");

  // The rights of trusts managers
  await enforcer.addPolicy("TRUSTMANAGER", "organisation", "SERVICE", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("TRUSTMANAGER", "users", "SERVICEMANAGER", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("TRUSTMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");

  // The rights of services managers and clinicians(step 2 and step 3)
  await enforcer.addPolicy("SERVICEMANAGER", "users", "STEP2", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("SERVICEMANAGER", "users", "STEP3", "(GET)|(POST)|(PUT)|(DELETE)");
  await enforcer.addPolicy("SERVICEMANAGER", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("SERVICEMANAGER", "patientanswers", "FORM1ANSWER", "(GET)");
  await enforcer.addPolicy("STEP2", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("STEP2", "patientanswers", "FORM2ANSWER", "(GET)");
  await enforcer.addPolicy("STEP3", "questionnaires", "QUESTIONNAIRE", "(GET)");
  await enforcer.addPolicy("STEP3", "patientanswers", "FORM2ANSWER", "(GET)");

  // patients
  await enforcer.addPolicy("PATIENT", "questionnaires", "FORM1", "GET");
}

initDB();