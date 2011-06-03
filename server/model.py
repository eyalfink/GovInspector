# -*- coding: utf-8 -*-

import urllib
import logging
from google.appengine.api import urlfetch
from django.utils import simplejson

import utils

DB_QUERY_URL = 'http://api.yeda.us/data/gov/inspector/issues?o=json'
DB_POST_URL = 'http://api.yeda.us/data/gov/inspector/issues'


class ModelAccess(object):

    def _get_json(self, params):
        request = '%s&%s'%(DB_QUERY_URL, urllib.urlencode(params))
        result = urlfetch.fetch(request)
        return simplejson.loads(result.content)

    def _post_json(self, params):
        headers={'Content-Type': 'application/json'}
        url = '%s/%s?%s'%(DB_POST_URL, 1, 'apikey=admin')
        data = simplejson.dumps(params)
        result = urlfetch.fetch(url=url,
                                payload=data,
                                method=urlfetch.POST,
                                headers=headers)
        if result.status_code != 200:
            raise utils.ErrorMessage(result.status_code,'%d\n%s'%(
                    result.status_code,result))

    def get_issue(self, issue_id):
        try:
            return self._get_json({'foo': 'bar'})
        except TypeError:
            # TODO: Return error in case `issue_id` isn't valid.
            raise

    def create_issue(self, issue):
         self._post_json(issue)

    def update_issue(self, issue_id):
        pass

    def query(self, query_string):
        pass

    def get_ministry_avg(self):
        pass
        # query_obj = {key: { issue.unit.office.name:true },
        #              reduce: function(obj,prev) { 
        #                  prev.sum += obj.status; 
        #                  prev.tot += obj.tot;
        #              },
        #              initial: { sum: 0; tot: 0;}
        #              }


