from pathlib import Path  # python3 only
import os

class Config:
    TESTING = os.environ['TESTING'] = 'False'
    DEBUG = os.environ['DEBUG'] = 'True'
    SECRET_KEY = os.environ.get('SECRET')
    SERVER = os.environ['SERVER'] = '0.0.0.0'
    SQLALCHEMY_TRACK_MODIFICATIONS = False