import utils

class AddIssue(utils.Handler):
    def get(self):
        self.render('templates/add_issue.html',
                    params=self.params)


if __name__ == '__main__':
    utils.run([('/admin/add_issue', AddIssue)], debug=True)

