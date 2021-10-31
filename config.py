from pathlib import Path 
import os

class Config:
    TESTING = os.environ['TESTING'] = 'False'
    DEBUG = os.environ['DEBUG'] = 'True'
    SECRET_KEY = 'dwfmsemfsikfnmsfi'
    SERVER =  '0.0.0.0'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_TYPE = 'filesystem'