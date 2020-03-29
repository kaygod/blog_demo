const loginRoute = require("./routes/login");
const { Fail } = require("./models/Response");


const app = (req, res) => {

  res.json = function (data) {
    res.end(JSON.stringify(data));
  }

  let result = loginRoute(req);

  if (result) {

    res.json(result);

    return false;

  }

  res.json(new Fail(1, "page not found 404"));

}

module.exports = app;