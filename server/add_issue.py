import utils
import model
import random

class AddIssue(utils.Handler):
  def get(self):
    #print schema['title']
    self.render('templates/add_issue.html', schema=self.schema['fields'])

  def post(self):
    issue = {}
    for arg in self.request.arguments():
      if arg in self.schema and self.request.get(arg):
        issue[arg] = self.request.get(arg)
        # issue = { "title": self.request.get('issue[title]'),
        #           "defect": self.request.get('issue[defect]'),
        #           "track": self.request.get('issue[track]'),
        #           "status": self.request.get('issue[status]'),
        #           "type": self.request.get('issue[type]')}
    issue_id = random.randint(100,100000)
    self.model.create_issue(issue_id=issue_id, issue=issue)

    self.render('templates/show_issue.html', id=issue_id)


if __name__ == '__main__':
    utils.run([('/admin/add_issue', AddIssue)], debug=True)

