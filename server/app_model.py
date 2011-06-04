from google.appengine.ext import db
from google.appengine.api import users
from google.appengine.ext.db import djangoforms


class Secrets(db.Model):
  yeda_token = db.StringProperty()

class SecretsForm(djangoforms.ModelForm):
  class Meta(object):
    model = Secrets
