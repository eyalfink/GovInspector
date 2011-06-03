# -*- coding: utf-8 -*-

class ModelAccess(object):
    def get_issue(self, issue_id):
        try:
            # TODO: Added error checking.

            return {
                "title": {
                    "en": "Government decisions & Issues as they're described by the government inspector report",
                    "he": "äçìèåú äîîùìä åñòéôé ìé÷åé ëôé ùòìå áãå\"çåú îá÷ø"
                },
                "update_date": "03/06/2011",
                "author": {
                    "en": "Michael Genkin",
                    "he": "îéëàì âð÷éï"
                },
                "contact": { "email": "misha.genkin+public@gmail.com" },
                "datafile": "issues.json",
                "fields": {
                    "type": {
                        "type": "int",
                        "description": {
                            "en": "The type of the issue, use 0 for inspector report issues, 1 for government decisions",
                            "he": "ñåâ äñòéó, äùúîù á0 áùáéì ñòéôé ìé÷åé îãå\"ç äîá÷ø å1 áùáéì äçìèåú äîîùìä"
                        }
                    },
                    "status": {
                        "type": "int",
                        "description": {
                            "en": "The status of the issuse - 1 for fixed, 2 for in progress, 3 for wont't fix",
                            "he": "ñèàèåñ äèéôåì áñòéó - 1 òáåø èåôì, 2 òáåø èåôì çì÷éú, 3 òáåø ìà èåôì"
                        }
                    },
                    "text": {
                        "type": "str",
                        "description": {
                            "en": "The description of the issue",
                            "he": "úéàåø äñòéó"
                        }
                    },
                    "followup": {
                        "type": "str",
                        "description": {
                            "en": "A follow up on the described issue",
                            "he": "úéàåø ùì äîò÷á àçø áéöåò äñòéó"
                        }
                    },
                    "link": {
                        "type": "str",
                        "description": {
                            "en": "A link to the issue in the inspector's website",
                            "he": "÷éùåø ìñòéó áàúø îá÷ø äîãéðä"
                        }
                    },
                    "report": {
                        "type": "ref",
                        "params": [ "data/gov/inspector/reports" ],
                        "description": {
                            "en": "The inspector's report from which the issue originated",
                            "he": "ãå\"ç îá÷ø äîãéðä áå ãååç äñòéó"
                        }
                    },
                    "unit": {
                        "type": "ref",
                        "params": [ "data/gov/inspector/units" ],
                        "description": {
                            "en": "The executive unit under whose jurisdiction the issue is",
                            "he": "äéçéãä àùø äñòéó áñîëåúä"
                        }
                    },
                    "topic": {
                        "type": "ref",
                        "params": [ "data/common/topics" ],
                        "description": {
                            "en": "The topic under which the issue is filed",
                            "he": "äðåùà áå òåñ÷ äñòéó"
                        }
                    }
                }
            }

        except TypeError:
            # TODO: Return error in case `issue_id` isn't valid.
            pass

    def create_issue(self):
        pass

    def update_issue(self, issue_id):
        pass

    def query(self, query_string):
        pass
