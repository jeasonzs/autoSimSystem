#coding=utf-8

__author__ = 'jeason'
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')
        # dat=[]
        # for i in range(0,10000):
        #     item = '故障'+str(i)
        #     dat.append(item)
        # self.render('index.html',issues=dat)
