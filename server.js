const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  defaultLayout: "main",
  helpers,
});

const isProd = process.env.NODE_ENV === "production";
if (isProd) app.set("trust proxy", 1);

const sess = {
  secret: process.env.SESSION_SECRET || "Super secret secret",
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
