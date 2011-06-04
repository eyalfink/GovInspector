# coding=utf-8
import docx
import os
import json
import codecs
import re
import update_table

_POI = [u"ליקוי", u"מעקב"]
_POI_TYPES = {0: "text", 1: "followup"}

def get_ref(name, collection):
	for entry in collection:
		if entry["name"] == name:
			return entry["name"]
	else:
		collection.append( { "name": name, "slug": hash( name ) } )
		return collection[-1]["name"]

def main():
	files = os.listdir( "./data" )
	result = codecs.open("./result.txt", "w+", "utf-8")
	offices = []
	topics = []
	units = []
	for file in files:
		paragraphs = docx.getdocumenttext(docx.opendocx("./data/%s" % (file, )))
		results = []
		flag = False
		type = -1 #type uninitialized
		
		#TODO: Switch to using plain lists for offices, topics & units
		office_name = get_ref( paragraphs[0].strip(), offices ) #First paragraph is the office
		topic = get_ref( paragraphs[1].strip(), topics ) #Second paragraph is the report topic
		
		#Third paragraph is the inspected units
		#TODO: Insure the paragraph is a list of inspectees, and clean the header
		#TODO: Smarter filtering for units and offices
		inspected = paragraphs[2].strip().split(";")
		new_inspected = []
		for inspectee in inspected:
			inspectee = inspectee.split("-")
			inspectee = [i.strip() for i in inspectee]
			inspectee_name = inspectee[0] if len(inspectee) == 1 else inspectee[1]
			unit = filter( lambda x: x["name"] == inspectee_name, units)
			if len( unit ) == 0:
				office = "" if len( inspectee ) == 1 else get_ref( inspectee[0].strip(), offices )
				units.append( { "name": inspectee_name, "slug": hash( inspectee_name ), "office": office } )
				new_inspected.append( units[-1]["name"] )
			else:
				new_inspected.append( unit[0]["name"] )
		
		for paragraph in paragraphs:
			paragraph = paragraph.strip()
			if paragraph in _POI:
				flag = True
				results.append( { "id": 0, "type": 0, "status": 0, "text": "", "followup": "", "link": "", "report": "", "unit": "", "topic": topic.encode("utf-8"), "office": office_name.encode("utf-8") } )
				type = _POI.index(paragraph)
			elif flag:
				if re.match("(\d+)\.?", paragraph):
					results[-1]["id"] = int(re.match("(\d+)\.?", paragraph).groups(1)[0])
				
				results[-1][_POI_TYPES[type]] += re.sub("(\d+)\.?", "", paragraph).encode("utf-8") if len(paragraph) > 1 else ""
		
		#TODO: Properly compute status
		for entry in results:
			for inspectee in new_inspected:
				update_table.insert_row( (entry["id"], entry["type"], entry["status"], entry["text"], entry["followup"], entry["link"], entry["report"], inspectee.encode("utf-8"), entry["topic"], entry["office"]) )
		

if __name__ == "__main__":
	main()