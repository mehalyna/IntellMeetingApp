import os

class Config:
    """Base config class"""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-key-for-development-only')
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    """Development config"""
    DEBUG = True
    
class TestingConfig(Config):
    """Testing config"""
    TESTING = True
    
class ProductionConfig(Config):
    """Production config"""
    # In production, ensure SECRET_KEY is set in environment variables
    DEBUG = False
    TESTING = False

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}