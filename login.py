#coding=utf-8

__author__ = 'jeason'
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web




class LoginHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('login.html')