module.exports = {
	addCommentPage: (req, res) => {
		res.render('addComment.ejs', {
			title: "Add Comment",
			message: '',
			loggedIn:req.session.loggedIn
		});
	},
	
	addComment: (req, res) => {
		let description = req.body.description;

		let insertQuery ="INSERT INTO `comments` (author, description, postedTime) VALUES ('" +
                            req.session.userId + "', '" + description + "',  NOW())";
		db.query(insertQuery, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.redirect('/');
		});
    },
    
    editCommentPage: (req, res) => {
        let commentId = req.params.id;
        let selectQuery = "SELECT * FROM `comments` WHERE commentId = '" + commentId + "' ";
        db.query(selectQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('editComment.ejs', {
                title: "Edit  Comment",
                comment: result[0],
                message: '',
				loggedIn:req.session.loggedIn
            });
        });
    },
    
    editComment: (req, res) => {
        let commentId = req.params.id;
        let description = req.body.description;

        let updateQuery = "UPDATE `comments` SET `description` = '" + description + "' WHERE commentId = '" + commentId + "'";
        db.query(updateQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    
    deleteComment: (req, res, next) => {
		let commentId = req.params.id;
		let selectRepliesQuery = "SELECT * FROM `comments` WHERE parentId = '" + commentId + "'";
		let deleteQuery = 'DELETE FROM `comments` WHERE commentId = "' + commentId + '"';
		
		db.query(selectRepliesQuery, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            results.forEach((result, index) => {
				let deleteReplyQuery = 'DELETE FROM `comments` WHERE commentId = "' + result.commentId + '"';
				db.query(deleteReplyQuery, (err, result) => {
					if (err) {
						return res.status(500).send(err);
					}
				});
			});
			
			db.query(deleteQuery, (err, result) => {
				/*if (err) {
					return res.status(500).send(err);
				}*/
				res.redirect('/');
			});			
        });
    },
	
	replyCommentPage: (req, res) => {
        let parentId = req.params.parentid;
		
        let selectQuery = "SELECT * FROM `comments` WHERE commentId = '" + parentId + "' ";
		
        db.query(selectQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('replyComment.ejs', {
                title: "Reply  Comment",
                comment: result[0],
                message: '',
				loggedIn:req.session.loggedIn
            });
        });
    },
	
	replyComment: (req, res) => {
		let description = req.body.description;
		let parentId = req.body.parentId;
		let userId = req.session.userId;

		let insertQuery ="INSERT INTO `comments` (parentId, author, description, postedTime) VALUES ('" +
                            parentId + "', '" + userId + "', '" + description + "',  NOW())";
		db.query(insertQuery, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.redirect('/');
		});
    },
}
