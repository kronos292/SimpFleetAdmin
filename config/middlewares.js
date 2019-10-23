const cookieSession = require("cookie-session");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const csurf = require("csurf");
const compression = require("compression");
const MerrorModule = require("express-merror");
const cors = require("cors");

const keys = require("./keys");

module.exports = function(app) {
  app.use(helmet());
  app.use(cors());

  /* Start of Morgan Logger Configurations */
  morgan.token("date", function() {
    const p = new Date()
      .toString()
      .replace(/[A-Z]{3}\+/, "+")
      .split(/ /);
    return p[2] + "/" + p[1] + "/" + p[3] + ":" + p[4] + " " + p[5];
  });
  app.use(morgan("combined"));
  /* End of Morgan Logger Configurations */

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  /* Start of Session Configurations */
  app.set("trust proxy", 1);
  const sessionConfig = {
    name: "session",
    keys: [keys.COOKIE_KEY],

    // Cookie Options
    maxAge: 1 * 60 * 60 * 1000,
    secure: false,
    httpOnly: false
  };
  app.use(cookieSession(sessionConfig));
  /* End of Session Configurations */

  function shouldCompress(req, res) {
    if (req.headers["x-no-compression"]) {
      return false;
    }

    return compression.filter(req, res);
  }
  app.use(compression({ filter: shouldCompress }));

  const csurfProtection = csurf({ cookie: true });

  const Merror = MerrorModule.Merror;
  const MerrorMiddleware = MerrorModule.MerrorMiddleware;
  app.use(MerrorMiddleware());
};
