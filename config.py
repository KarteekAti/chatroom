import os

class Config:
    TESTING = 'False'
    DEBUG = 'True'
    SECRET_KEY = os.environ.get('SECRET')
    SERVER = '0.0.0.0'
    