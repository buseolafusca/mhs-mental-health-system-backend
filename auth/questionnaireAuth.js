exports.index = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  var subjects = await enforcer.getAllSubjects();
  var result = [];
  for (subject of subjects) {
    if (await enforcer.enforce(req.jwt.id, "questionnaires", subject, req.method)) {
      result.push(subject);
    }
  }
  console.log(req.jwt.id, " get ", result);
  req.query = {
    _id: {
      $in: result
    }
  };
  next();
}

exports.new = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.body.role, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.add = async (req, res) => {
  var enforcer = await require('../config/casbin');
  if (req.body.is_public) {
    await enforcer.addGroupingPolicy(req.models.id, "FORM1");
  }
}

exports.view = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.update = async (req, res, next) => {
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.change = async (req, res) => {
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}

exports.delete = async (req, res, next) => {
  var enforcer = await require('../config/casbin');
  if (await enforcer.enforce(req.jwt.id, "questionnaires", req.params.id, req.method)) {
    next();
  } else {
    res.status(401).send({
      message: 'Not Allow!',
    });
  }
  next();
}
