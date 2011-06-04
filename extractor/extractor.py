# coding=utf-8
import docx
import os
import json
import codecs
import re

_POI = [u"ליקוי", u"מעקב"]
_POI_TYPES = {0: "text", 1: "followup"}

def main():
	files = os.listdir( "./data" )
	result = codecs.open("./result.txt", "w+", "utf-8")
	offices = []
	
	for file in files:
		paragraphs = docx.getdocumenttext(docx.opendocx("./data/%s" % (file, )))
		results = []
		flag = False
		type = -1 #type uninitialized
		
		for paragraph in paragraphs:
			paragraph = paragraph.strip()
			if paragraph in _POI:
				flag = True
				results.append( { "id": 0, "text": "", "followup": "" } )
				type = _POI.index(paragraph)
			elif flag:
				if re.match("(\d+)\.?", paragraph):
					results[-1]["id"] = int(re.match("(\d+)\.?", paragraph).groups(1)[0])
				
				results[-1][_POI_TYPES[type]] += re.sub("(\d+)\.?", "", paragraph) if len(paragraph) > 1 else ""
			
		for entry in results:
			result.write("%d:text:%s\nfollowup:%s\n" % (entry["id"], entry["text"], entry["followup"]))

	
if __name__ == "__main__":
	main()