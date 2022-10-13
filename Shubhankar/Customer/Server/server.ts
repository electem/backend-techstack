const passport = require("passport")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const pino = require("pino")
const {Container} = require("typedi")
const jwt = require("jsonwebtoken")
const {
  createExpressServer,
  useContainer,
  Action
} = require("routing-controllers")

const logger = pino({
  name: "rackmanagement",
  level: "debug"
})

let app = express()

global.__basedir = __dirname
var corsOptions = {
  origin: "http://localhost:8000"
}
app.use(cors())
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// database
const db = require("./app/models")
const Role = db.role
const Menu = db.menus
const Plan = db.plans
const USER = db.user
const CLIENT = db.clients

db.sequelize.sync()
//force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  logger.info("Drop and Resync Database with { force: true }")
  //initial()
})
// simple route
app.get("/", (req, res) => {
  res.send({message: "Welcome to bezkoder application."})
})
useContainer(Container)
app = createExpressServer({
  authorizationChecker: async (action = Action) => {
    const token = await action.request.headers["authorization"]
    try {
      const temp = token.split(" ")[1]
      var decoded = jwt.verify(temp, "SECRET_KEY")
    } catch (err) {
      err
    }
    return token !== undefined
  },
  cors: true,
  paramOptions: {
    //with this option, argument will be required by default
    required: true
  },

  controllers: [__dirname + "/app/controllers/*.js"]
})

require("./app/routes/elasticsearch.routes")(app)
//initRoutes(app)
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
})
function initial() {
  CLIENT.create({
    name: "SuperAdmin"
  })
  Role.create({
    name: "Admin"
  })

  Role.create({
    name: "SuperAdmin"
  })

  Role.create({
    name: "Staff"
  })

  Plan.create({
    name: "Personal",
    noOfUsers: 1,
    noOfRacks: 2,
    noOfItemTypes: 3,
    rate: 500,
    planImg: "http://localhost:8080/files/LLP.png"
  })

  Plan.create({
    name: "Company/Traders",
    noOfUsers: 5,
    noOfRacks: 10,
    noOfItemTypes: 10,
    rate: 1000,
    planImg: "http://localhost:8080/files/traders.jpg"
  })

  Plan.create({
    name: "Distributors",
    noOfUsers: 25,
    noOfRacks: 50,
    noOfItemTypes: 20,
    rate: 2000,
    planImg: "http://localhost:8080/files/Distrubutors.jpg"
  })

  Menu.create({
    label: "DashBoard",
    action: "/dashboard",
    roleId: 2
  })

  Menu.create({
    label: "Home",
    action: "/template",
    roleId: 2
  })

  Menu.create({
    label: "Staff",
    action: "/staff",
    roleId: 2
  })

  Menu.create({
    label: "Racks",
    action: "/racks",
    roleId: 2
  })

  Menu.create({
    label: "Stores",
    action: "/stores",
    roleId: 2
  })

  USER.create({
    username: "superadmin",
    email: "developers@electems.com",
    password: "59a318dc58e054cc975332365bf1e264",
    status: "ACTIVE",
    clientFk: 1,
    roleId: 2
  })
}
