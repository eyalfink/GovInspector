import utils

from django.utils import simplejson
import model

class ReportByOffice(utils.Handler):
    def get(self):
        self.render('templates/report_by_office.html',
                    params=self.params)


if __name__ == '__main__':
    utils.run([('/report_by_office', ReportByOffice)], debug=True)

