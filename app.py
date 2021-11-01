from flask import Flask ,render_template, url_for, redirect, request, session, jsonify, flash, Blueprint
from flask_session import Session
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
from werkzeug.middleware.proxy_fix import ProxyFix
from database import db,Users
import config
import os	

app = Flask(__name__,instance_relative_config=False)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1 ,x_proto=1)
app.config.from_object('config.Config')
app.config['SECRET_KEY'] = os.environ.get('SECRET')
app.config['SESSION_COOKIE_SECURE'] = False
CORS(app)
Session(app)
uri = os.getenv("DATABASE_URL")
if uri and uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = uri 
socketio = SocketIO(app,async_mode='gevent')


NAME_KEY = 'name'

def init_db():
    db.init_app(app)
    db.app = app
    db.create_all()


init_db()


@app.route('/login',methods=['GET','POST'])
def login():		
	print(1)
	if request.method == 'POST':
		if Users.is_user(request.form['username'],request.form['password']):
			name = Users.get_name(request.form['username'])
			session['name'] = name
			print(session.get('name'))
			return redirect('/home')
	return render_template("login.html",session=session)

# @app.route("/logout")
# def logout(data):
#     session.pop(NAME_KEY, None)
#     flash("0 {} {}".format(data['name'],data['msg']))
#     return redirect(url_for("login"))	

@app.route('/')
@app.route('/home',methods=['GET','POST'])
def home():
	if session.get('name') == None:
		return redirect('/login')
	return render_template('index.html',session = session)	



@app.route('/signin',methods=['GET','POST'])
def signin():
	return render_template('signin.html')	

@socketio.on('message')
def handleMessage(data):
	print(3)
	usr_name = session.get('name')
	print(session.get('name'))
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
		return redirect('login')
	except Exception as e:
		print(e)	

if __name__ == '__main__':	
	port = int(os.environ.get('PORT', 5000))
	socketio.run(app,port=port)  