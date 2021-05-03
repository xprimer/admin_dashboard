const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const PassportLocalStrateg = require('./api/config/passport.strategy/local.strategy');
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const path = require("path");
const app = express();

const port = 3000;

//Connect MongoDB
const mongoDB = "mongodb://127.0.0.1:27017/contact_management";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("error", (err) => {
  console.log("Error while connecting to MongoDB : " + err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("***** Connect to MongoDB successfully");
});

////////////// APP CONFIGURE
app.use(morgan("tiny"));

// app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(
  expressSession({
    secret: "flying dragon",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: mongoDB,
      collectionName: "sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies use .
passport.use('local', PassportLocalStrateg);

// Routes uses.
const SiteRouter = require("./api/routes/v1/site.route");
const UserRouter = require('./api/routes/v1/user.route');



// HOST/api/v1/
app.use("/api/v1/", SiteRouter);
app.use("/api/v1/user/", UserRouter);

//404 - Cant not get bla bla bla
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    data: [],
    messages: "Page not found .",
  });
});

// Passport Serialize and Deserialize
passport.serializeUser(function (user, done) {
  console.log("Serialize invoked !");
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('Deserialize invoked !');
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
