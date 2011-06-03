import utils
import model

class AddIssue(utils.Handler):
  def get(self):      
    self.render('templates/add_issue.html', params=self.params)

  def post(self):
    issue = { "title": self.request.get('issue[title]'),
              "defect": self.request.get('issue[defect]'),
              "track": self.request.get('issue[track]'),
              "status": self.request.get('issue[status]'),
              "type": self.request.get('issue[type]')}
    self.model.create_issue(issue)

    self.render('templates/show_issue.html', params=self.params)



if __name__ == '__main__':
    utils.run([('/admin/add_issue', AddIssue)], debug=True)

