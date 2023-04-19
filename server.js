const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex') 

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-ch04a4bh4hstquoq0no0-a', //'127.0.0.1',
      port : 5432,
      user : 'photodb_user', //'postgres',
      password : '8kQTy6dxyl4xOalaSodZheQ2vCJvkHAv',//'',
      database : 'photodb' //'smart-brain'
    }
  });

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send('Success')} )
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })  
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})