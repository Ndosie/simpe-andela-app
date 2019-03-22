module.exports = {
    homePage: (req, res) => {
		let role = req.session.role;
		let selectQuery = "SELECT * FROM `users` INNER JOIN `comments` ON `users`.userId = `comments`.author ORDER BY postedTime ASC";
	
		 
		db.query(selectQuery, (err, results) => {
			let replies = [];
			let returned;
			let parentId;
			if (err) {
				return res.status(500).send(err);
			}
			
			results.forEach((result, index) => {
				if(result.parentId){
					replies.push(result);
				}
			});
			
			res.render('index.ejs', {
				title: "Simple App",
				loggedIn: req.session.loggedIn,
				userId : req.session.userId,
				comments: results,
				replies,
				role
			});
		});
	
        
    },
};
