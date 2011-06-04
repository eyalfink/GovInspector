
import utils
import model


class ModelTest(utils.Handler):
    def get(self):
        #self.model.create_issue({'title': 'Test Issue'})
        #print 'create OK'

        issue = self.model.get_issue(1)
        print 'get OK'
        print '%s'%issue


if __name__ == '__main__':
    utils.run([('/test', ModelTest)], debug=True)
