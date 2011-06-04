import utils
import logging
import app_model

class SetSecret(utils.Handler):
    def get(self):
        self.response.out.write('<html><body>'
                                '<form method="POST" '
                                'action="/admin/set_secret">'
                                '<table>')
        # This generates our shopping list form and writes it in the response
        self.response.out.write(app_model.SecretsForm())
        self.response.out.write('</table>'
                                '<input type="submit">'
                                '</form></body></html>')

    def post(self):
        data = app_model.SecretsForm(data=self.request.POST)
        if data.is_valid():
            # Save the data, and redirect to the view page
            logging.info('setting secret to %s', data)
            entity = data.save(commit=True)
            entity.put()
            self.redirect('/')
        else:
            # Reprint the form
            self.response.out.write('<html><body>'
                                    '<form method="POST" '
                                    'action="/admin/set_secret">'
                                    '<table>')
            self.response.out.write(data)
            self.response.out.write('</table>'
                                    '<input type="submit">'
                                    '</form></body></html>')


if __name__ == '__main__':
    utils.run([('/admin/set_secret', SetSecret)], debug=True)

