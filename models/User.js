class User{
	constructor(firstName, lastName, email){
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = "normal";
	}
	
	set firstName(value){
		this._firstName = value;
	}
	set lastName(value){
		this._lastName = value;
	}
	set email(value){
		this._email = value;
	}
	set role(value){
		this._role = value;
	}

	get firstName(){
		return this._firstName;
	}
	get lastName(){
		return this._lastName;
	}
	get email(){
		return this._email;
	}
	get role(){
		return this._role;
	}
}

module.exports = User;