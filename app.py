from flask import Flask ,render_template, url_for, redirect, request, session, jsonify, flash, Blueprint
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from database import db,Users
import config
import os	

app = Flask(__name__,instance_relative_config=False)
CORS(app)
app.config.from_object('config.Config')
app.config['CORS_HEADERS'] = 'Content-Type'
uri = os.getenv("DATABASE_URL")
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = uri 
socketio = SocketIO(app,cors_allowed_origins='*',async_mode='gevent')


NAME_KEY = 'name'

def init_db():
    db.init_app(app)
    db.app = app
    db.create_all()


init_db()

@app.route('/')
@app.route('/login',methods=['GET','POST'])
def login():		
	print(1)
	if request.method == 'POST':
		if Users.is_user(request.form['username'],request.form['password']):
			name = Users.get_name(request.form['username'])
			session['name'] = name
			return redirect(url_for('home'))
	return render_template("login.html",session=session)

# @app.route("/logout")
# def logout(data):
#     session.pop(NAME_KEY, None)
#     flash("0 {} {}".format(data['name'],data['msg']))
#     return redirect(url_for("login"))	

@app.route('/home',methods=['GET','POST'])
def home():
	if session['name'] != ''
		print(2)
	return render_template('index.html',session = session)	



@app.route('/signin',methods=['GET','POST'])
def signin():
	return render_template('signin.html')	

@socketio.on('message')
def handleMessage(data):
	print(3)
	usr_name = session.get('name')
	print(session)
	print('{}: {}'.format(usr_name, data))
	data = {'name':usr_name, 'msg':data}
	send(data, broadcast=True)


@socketio.on('signin') 	
def signin(payLoad):
	try:
		info = Users(first_name=payLoad['firstname'],last_name=payLoad['lastname'],username=payLoad['username'],password=payLoad['password'])
		db.session.add(info)
		db.session.commit()
		print('Data Recieved')
	except Exception as e:
		print(e)	

if __name__ == '__main__':	
	port = int(os.environ.get('PORT', 5000))
	socketio.run(app,port=port)  