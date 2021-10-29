from pathlib import Path  # python3 only
import os

class Config:
    TESTING = os.environ['TESTING'] = 'False'
    DEBUG = os.environ['DEBUG'] = 'True'
    SECRET_KEY = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    SERVER = os.environ['SERVER'] = '0.0.0.0'
    SQLALCHEMY_TRACK_MODIFICATIONS = False