import pypandoc

import flask
from flask import Flask
app = Flask(__name__)


save_converted = ""


@app.route('/')
def home():
    return flask.render_template("upload.html")


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if flask.request.method == 'POST':
        global save_converted
        network_file = flask.request.files['file']
        stream = network_file.read()
        save_converted = pypandoc.convert(stream, 'revealjs', format='md',
                                          extra_args=['--standalone',
                                                      '--self-contained'])
        return "True"


@app.route('/preview', methods=['GET'])
def preview():
    return save_converted

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
