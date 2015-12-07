import charset
import pypandoc

import flask
from flask import Flask
from flask import request, send_from_directory
app = Flask(__name__)


save_converted = ""


@app.route('/')
def home():
    return flask.render_template("upload.html")


@app.route('/upload', methods=['POST'])
def upload():
    if flask.request.method == 'POST':
        global save_converted
        network_file = flask.request.files['file']
        stream = network_file.read()
        utf8_stream = charset.text_to_utf8(stream)
        save_converted = pypandoc.convert(utf8_stream, 'revealjs', format='md',
                                          extra_args=['--standalone',
                                                      '--self-contained'])
        return "True"


@app.route('/preview', methods=['GET'])
def preview():
    return save_converted


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
