from google.appengine.dist import use_library
use_library('django', '1.2')
from google.appengine.ext import webapp
import google.appengine.ext.webapp.util

from google.appengine.api import urlfetch
from django.utils import simplejson

class FtBridge(webapp.RequestHandler):
    def get(self):
        url = ("http://www.google.com/fusiontables/gvizdata?" +
               self.request.query_string)
        result = urlfetch.fetch(
            url=url,
            headers={'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'})
        if result.status_code != 200:
            raise # 
        self.response.headers['Content-Type'] = "text/javascript; charset=UTF-8"
        self.response.out.write(result.content)


if __name__ == '__main__':
    webapp.util.run_wsgi_app(webapp.WSGIApplication([('/ft_bridge', FtBridge)], debug=True))

