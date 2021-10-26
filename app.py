from flask import Flask 
from flask_socketio import SocketIO, emit, send
from flask_cors import CORS
import config

app = Flask(__name__,instance_relative_config=False)
app.config.from_object('config.Config')
socketio = SocketIO(app,cors_allowed_origins='*')

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

if __name__ == '__main__':
	app.run()   