#coding=utf-8

__author__ = 'jeason'
import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

# from login import  LoginHandler
from index import  IndexHandler
from volData import  VolDataHandler
from waveData import  WaveDataHandler
from setting import SettingHandler


from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)


if __name__ == "__main__":
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[
            (r"/index.html", IndexHandler),
            (r"/volData.html", VolDataHandler),
            (r"/waveData.html", WaveDataHandler),
            (r"/setting.html", SettingHandler)
        ],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()