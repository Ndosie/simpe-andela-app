const User = require('../models/User');
const Moderator = require('../models/Moderator');
const Admin = require('../models/Admin');

module.exports = {
    loginPage: (req, res) => {
		res.render('login.ejs', {
            title: "Login",
			message: '',
			loggedIn:req.session.loggedIn
        });
    },
	
	login: (req, res) => {
		let email = req.body.email;
        let password = req.body.password;
		let loginQuery = "SELECT * FROM `users` WHERE email = '" + email + "' AND password = '" + password + "'";
		
        db.query(loginQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
				
				let user;
				switch(result[0].role){
					case 'admin':
						user = new Admin(result[0].firstName, result[0].lastName, result[0].email);
						break;
					case 'moderator':
						user = new Moderator(result[0].firstName, result[0].lastName, result[0].email);
						break;
					case 'normal':
						user = new User(result[0].firstName,result[0].lastName, result[0].email);
						break;
				}						
				
				req.session.loggedIn = true;
				req.session.userId = result[0].userId;
				req.session.role = user.role;
				
				let updateQuery = "UPDATE `users` SET `lastLoggedInAt` = NOW() WHERE userId = '" + result[0].userId + "'";
				db.query(updateQuery, (err, result) => {
					if (err) {
						return res.status(500).send(err);
					}
					res.redirect('/');
				});
            } else {
                message = 'Wrong credentials!!';
                res.render('login.ejs', {
                    message,
                    title: 'Login',
					loggedIn:req.session.loggedIn
                });
            }
		});
	},
	
	logout: (req, res) => {
		req.session.loggedIn = false;
		
		res.render('index.ejs', {
			title: 'Simple App',
			loggedIn: req.session.loggedIn
		});
	},
	
	
};
