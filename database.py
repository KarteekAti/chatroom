from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Users(db.Model):
	__tablename__ = 'login_details'
	first_name = db.Column(db.String(128), nullable=False)
	last_name = db.Column(db.String(128), nullable=False)
	username = db.Column(db.String(128),nullable=False,primary_key=True)
	password = db.Column(db.String(128),nullable=False)


	def __repr__(self):
		return '<User %r>' % self.username

	def is_user(uname,passwd):
		db_pass = Users.query.filter_by(username=uname).first()
		if(db_pass.password == passwd): 
			return True
		else: 
			return False		

	def get_name(uname):
		name = Users.query.filter_by(username=uname).first()
		return name.first_name