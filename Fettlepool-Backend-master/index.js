const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
const express = require("express")
const dotenv = require("dotenv")
const child_process= require("child_process")
var cors = require('cors');
const bodyparser = require("body-parser")

dotenv.config()

const fettlepool = express()
fettlepool.use(cors());
fettlepool.use(bodyparser.urlencoded({ extended: true }));
fettlepool.use(express.static(__dirname));

const PORT = process.env.PORT
const APP = process.env.APP
const HOST = process.env.HOST
const UsersRoute = require('./routes/users.route')
const UsersCardRoute = require('./routes/users.card.route')
const UsersAdminTokenRoute = require('./routes/users.admin.token.route')
const UsersTokenRoute = require('./routes/users.token.route')
const AdminRoute = require('./routes/admin.route')
const GymRoute = require('./routes/gym.route')
const TokenRoute = require('./routes/token.route')
const ImageRoute = require('./routes/image.route')
const AnalyticsRoute = require('./routes/analytics.route')

fettlepool.use(bodyparser.json())
fettlepool.use('/api/admin', AdminRoute)
fettlepool.use('/api/accounts', UsersRoute)
fettlepool.use('/api/card', UsersCardRoute)
fettlepool.use('/api/adminToken', UsersAdminTokenRoute)
fettlepool.use('/api/usersToken', UsersTokenRoute)
fettlepool.use('/api/gym', GymRoute)
fettlepool.use('/api/token', TokenRoute)
fettlepool.use('/api/images', ImageRoute)
fettlepool.use('/api/analytics', AnalyticsRoute)

fettlepool.listen(PORT, ()=>{
    console.log(`${APP}\'s API is running on ${HOST}:${PORT}`)
    
})

    fettlepool.get('/', function (request, response) {
        console.log('Request to worker %d', cluster.worker.id);
        response.sendFile('apilandingpage.html', { root: './views' });
    });

console.log('Worker %d running!', cluster.worker.id);

}
