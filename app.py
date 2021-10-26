from flask import Flask ,render_template
import eventlet
eventlet.monkey_patch()
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send
import config
import os	
app = Flask(__name__,instance_relative_config=False)
CORS(app)
app.config.from_object('config.Config')
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app,cors_allowed_origins='*')

@app.route("/",methods=['GET', 'POST'])
def index():
  return render_template('index.html',)

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

if __name__ == '__main__':
	port = int(os.environ.get('PORT', 5000))
	socketio.run(app,port=port)  