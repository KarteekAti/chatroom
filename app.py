from flask import Flask 
from flask_socketio import SocketIO, emit, send
import os

class Config:
    TESTING = 'False'
    DEBUG = 'True'
    SECRET_KEY = os.environ.get('SECRET')
    SERVER = '0.0.0.0'
    
app = Flask(__name__,instance_relative_config=False)
app.config.from_object('Config')
socketio = SocketIO(app,cors_allowed_origins='*')

@app.route('/')

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	socketio.run(app, host=(Config.SERVER),port=port)  