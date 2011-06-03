

import utils

class Main(utils.Handler):

    def get(self):
        self.render('templates/index.html',
                    params=self.params)


if __name__ == '__main__':
    utils.run([('/', Main)], debug=True)
