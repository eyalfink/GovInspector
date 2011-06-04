import utils

from django.utils import simplejson
import model

class ReportByOffice(utils.Handler):
    def get(self):
        self.render('templates/ministries.html',
                    params=self.params)


if __name__ == '__main__':
    utils.run([('/ministries', ReportByOffice)], debug=True)

