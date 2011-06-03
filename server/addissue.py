

import utils

class Main(utils.Handler):

    def get(self):
        self.render('templates/hello.html',
                    foo='bar')
    def post(self):
        


if __name__ == '__main__':
    utils.run([('/', Main)], debug=True)
