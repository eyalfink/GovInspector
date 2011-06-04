'''
Created on Dec 22, 2010

@author: kbrisbin
'''


from authorization.clientlogin import ClientLogin
from sql.sqlbuilder import SQL
import ftclient
from fileimport.fileimporter import CSVImporter



if __name__ == "__main__":

  import sys, getpass
  username = sys.argv[1]
  password = getpass.getpass("Enter your password: ")
  
  token = ClientLogin().authorize(username, password)
  ft_client = ftclient.ClientLoginFTClient(token)

  #create a table
  table = {'Inspector Issues':{'id':'NUMBER', 'type':'NUMBER', 'status':'NUMBER', 'text':'STRING', 'followup':'STRING', 'link':'STRING', 'report':'STRING', 'unit':'STRING', 'topic':'STRING', 'office':'STRING', }}
  tableid = int(ft_client.query(SQL().createTable(table)).split("\n")[1])
  print tableid