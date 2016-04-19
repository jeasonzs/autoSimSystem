#coding=utf-8

__author__ = 'jeason'
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web


class VolDataHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('volData.html')