let User = require('./User.js');

class Moderator extends User{
	constructor(firstName, lastName, email){
		super(firstName, lastName, email);
		this.role = "moderator";
	}
}

module.exports = Moderator;