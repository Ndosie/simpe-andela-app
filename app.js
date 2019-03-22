const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

const {homePage} = require('./routes/index');
const {loginPage, addUserPage, login, logout} = require('./routes/user');
const {addCommentPage, addComment, editCommentPage, editComment, deleteComment, replyCommentPage, replyComment} = require('./routes/comments');

let db_config = {
	host     : 'us-cdbr-iron-east-03.cleardb.net',
	user     : 'b2c29cfb69ad6d',
	password : 'cd0ad1c1',
	database : 'heroku_6d1f5511ce9a621'
};

pool = mysql.createPool(db_config); 

pool.getConnection(function(err,connection){
	if(err) {
	  console.log('error when connecting to db:', err);
	} else {
	  console.log("Database is connected!");
	}
});

global.db = pool;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my-secret', resave: false, saveUninitialized: true})); 

app.post('/login', login);
app.post('/addcomment', addComment);
app.post('/editcomment/:id', editComment);
app.post('/replycomment/:parentid', replyComment);
app.get('/', homePage);
app.get('/login', loginPage);
app.get('/logout', logout);
app.get('/addcomment', addCommentPage);
app.get('/editcomment/:id', editCommentPage);
app.get('/deletecomment/:id', deleteComment);
app.get('/replycomment/:parentid', replyCommentPage);


app.listen(process.env.PORT || 3000);