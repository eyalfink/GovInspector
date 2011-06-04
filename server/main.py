import utils

from django.utils import simplejson
import model

class Main(utils.Handler):
    def get(self):
        self.render('templates/home.html',
                    params=self.params,
                    data=simplejson.dumps(self.get_ministry_avg()))

    def get_ministry_avg(self):
        #results = self.model.query('agrr')
        #return self.model.get_issue(99636)
        return [
            {
                'name': 'foo',
                'avg':  0.5
            },
            {
                'name': 'bar',
                'avg':  0.5
            }
        ]


if __name__ == '__main__':
    utils.run([('/', Main)], debug=True)

