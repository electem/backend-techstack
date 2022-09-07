'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var pino = require('pino');
var Container = require('typedi').Container;
var jwt = require('jsonwebtoken');
var _a = require('routing-controllers'),
  createExpressServer = _a.createExpressServer,
  useContainer = _a.useContainer,
  Action = _a.Action;
var logger = pino({
  name: 'rackmanagement',
  level: 'debug',
});
var app = express();
global.__basedir = __dirname;
var corsOptions = {
  origin: 'http://localhost:8000',
};
app.use(cors());
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// database
var db = require('./app/models');
var Role = db.role;
var Menu = db.menus;
var Plan = db.plans;
var USER = db.user;
var CLIENT = db.clients;
db.sequelize.sync();
//force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(function () {
  logger.info('Drop and Resync Database with { force: true }');
  //initial()
});
// simple route
app.get('/', function (req, res) {
  res.send({ message: 'Welcome to bezkoder application.' });
});
useContainer(Container);
app = createExpressServer({
  authorizationChecker: function (action) {
    if (action === void 0) {
      action = Action;
    }
    return __awaiter(void 0, void 0, void 0, function () {
      var token, temp, decoded;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, action.request.headers['authorization']];
          case 1:
            token = _a.sent();
            try {
              temp = token.split(' ')[1];
              decoded = jwt.verify(temp, 'SECRET_KEY');
            } catch (err) {
              err;
            }
            return [2 /*return*/, token !== undefined];
        }
      });
    });
  },
  cors: true,
  paramOptions: {
    //with this option, argument will be required by default
    required: true,
  },
  controllers: [__dirname + '/app/controllers/*.js'],
});
require('./app/routes/elasticsearch.routes')(app);
//initRoutes(app)
// set port, listen for requests
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  logger.info('Server is running on port '.concat(PORT));
});
function initial() {
  CLIENT.create({
    name: 'SuperAdmin',
  });
  Role.create({
    name: 'Admin',
  });
  Role.create({
    name: 'SuperAdmin',
  });
  Role.create({
    name: 'Staff',
  });
  Plan.create({
    name: 'Personal',
    noOfUsers: 1,
    noOfRacks: 2,
    noOfItemTypes: 3,
    rate: 500,
    planImg: 'http://localhost:8080/files/LLP.png',
  });
  Plan.create({
    name: 'Company/Traders',
    noOfUsers: 5,
    noOfRacks: 10,
    noOfItemTypes: 10,
    rate: 1000,
    planImg: 'http://localhost:8080/files/traders.jpg',
  });
  Plan.create({
    name: 'Distributors',
    noOfUsers: 25,
    noOfRacks: 50,
    noOfItemTypes: 20,
    rate: 2000,
    planImg: 'http://localhost:8080/files/Distrubutors.jpg',
  });
  Menu.create({
    label: 'DashBoard',
    action: '/dashboard',
    roleId: 2,
  });
  Menu.create({
    label: 'Home',
    action: '/template',
    roleId: 2,
  });
  Menu.create({
    label: 'Staff',
    action: '/staff',
    roleId: 2,
  });
  Menu.create({
    label: 'Racks',
    action: '/racks',
    roleId: 2,
  });
  Menu.create({
    label: 'Stores',
    action: '/stores',
    roleId: 2,
  });
  USER.create({
    username: 'superadmin',
    email: 'developers@electems.com',
    password: '59a318dc58e054cc975332365bf1e264',
    status: 'ACTIVE',
    clientFk: 1,
    roleId: 2,
  });
}
//# sourceMappingURL=server.js.map
