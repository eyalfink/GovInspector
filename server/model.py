# -*- coding: utf-8 -*-

import urllib
import logging

DB_QUERY_URL = 'http://api.yeda.us/data/gov/inspector/issues'
DB_POST_URL = 'http://api.yeda.us/data/gov/inspector/issues'


class ModelAccess(object):

    def __init__(self, urlfetch, simplejson):
        self.urlfetch = urlfetch
        self.simplejson = simplejson

    def _get_json(self, params, issue_id=None):
        url = DB_QUERY_URL
        if issue_id:
            url += '/%s'%issue_id
            
        url += '?o=json&%s'%(urllib.urlencode(params))
        logging.info('Fetching: %s', url)
        result = self.urlfetch.fetch(url)
        return self.simplejson.loads(result.content)

    def _post_json(self, issue_id, params):
        headers={'Content-Type': 'application/json'}
        url = '%s/%s?%s'%(DB_POST_URL, issue_id, 'apikey=admin')
        data = self.simplejson.dumps(params)
        result = self.urlfetch.fetch(url=url,
                                payload=data,
                                method=self.urlfetch.POST,
                                headers=headers)
        return result.status_code

    def get_issue(self, issue_id):
        try:
            return self._get_json(issue_id=issue_id, params={})
        except TypeError:
            # TODO: Return error in case `issue_id` isn't valid.
            raise

    def create_issue(self, issue_id, issue):
         self._post_json(issue_id, issue)

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


