import http.server
import socketserver
import os
import sys

PORT = 3000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class CleanServerHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        url_path = self.path.split('?')[0]
        if url_path == '/':
            url_path = '/index.html'

        rel_path = url_path.lstrip('/')
        filepath = os.path.join(BASE_DIR, rel_path)

        if os.path.exists(filepath) and os.path.isfile(filepath):
            self.send_response(200)
            
            if filepath.endswith('.html'):
                self.send_header('Content-Type', 'text/html; charset=utf-8')
            elif filepath.endswith('.js'):
                self.send_header('Content-Type', 'application/javascript; charset=utf-8')
            elif filepath.endswith('.css'):
                self.send_header('Content-Type', 'text/css; charset=utf-8')
            elif filepath.endswith('.json'):
                self.send_header('Content-Type', 'application/json; charset=utf-8')
            elif filepath.endswith('.svg'):
                self.send_header('Content-Type', 'image/svg+xml')
            else:
                self.send_header('Content-Type', 'application/octet-stream')

            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()

            with open(filepath, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, f"File Not Found: {url_path}")

    def log_message(self, format, *args):
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format%args))
        sys.stderr.flush()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('127.0.0.1', PORT), CleanServerHandler) as httpd:
        print(f"Poonawalla Festive Server started at http://localhost:{PORT}", flush=True)
        httpd.serve_forever()
