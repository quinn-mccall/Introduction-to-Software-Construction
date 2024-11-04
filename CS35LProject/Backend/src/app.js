const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const session = require('express-session');
const crypto = require('crypto');

//TO AUTOMATE THE CREATION OF DOCUMENTATION WITH SWAGGER API
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Routes:
const userRoutes = require('./api/routes/userRoutes');

const categoryRoutes = require('./api/routes/categoryRoutes');
const roleRoutes = require('./api/routes/appRoleRoutes');
const permissionRoutes = require('./api/routes/permissionRoutes');
const appRolePermissionRoutes = require('./api/routes/appRolePermissionRoutes');
const appUserAppRoleRoutes = require('./api/routes/appUserAppRoleRoutes');

const budgetRoutes = require('./api/routes/budgetRoutes')
const ftfRoutes = require('./api/routes/ftfRoutes')
const financialTransactionRoutes = require('./api/routes/financialTransactionRoutes')

const statements = require('./api/routes/generateStatement');

const constants = require('../../constants')


const app = express();
const port = process.env.port || 3001;

// Configure session middleware
const secretkey = crypto.randomBytes(64).toString('hex');
app.use(session({
  secret: secretkey, 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(bodyParser.json());

// Enable CORS with credentials
app.use(cors({
  origin: constants.frontend, // Update to your frontend's URL
  credentials: true
}));

// Routes
app.use('/', userRoutes);
app.use('/', roleRoutes);
app.use('/', categoryRoutes);
app.use('/', permissionRoutes);
app.use('/', appRolePermissionRoutes);
app.use('/', appUserAppRoleRoutes);
app.use('/', budgetRoutes);
app.use('/', financialTransactionRoutes);
app.use('/', ftfRoutes);

app.use('/', statements);


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'BUDGET APP',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
        {
          url: `http://localhost:${port}`, 
        },
    ],
  },
  apis: ['./src/api/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
});
