from flask import Flask ,render_template
from flask_socketio import SocketIO, emit, send
import config
import os	
app = Flask(__name__,instance_relative_config=False)
app.config.from_object('config.Config')
socketio = SocketIO(app,cors_allowed_origins='*')

@app.route("/")
def index():
  return render_template('index.html',)

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	socketio.run(app, host=config.Config.SERVER,port=port)  