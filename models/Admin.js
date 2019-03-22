let User = require('./User.js');

class Admin extends User{
	constructor(firstName, lastName, email){
		super(firstName, lastName, email);
		this.role = "admin";
	}
}

module.exports = Admin;