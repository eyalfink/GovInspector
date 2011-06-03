
import utils
import model


class ModelTest(utils.Handler):
    def get(self):
        self.model.create_issue({'title': 'Test Issue'})
        print 'OK'


if __name__ == '__main__':
    utils.run([('/test', ModelTest)], debug=True)
