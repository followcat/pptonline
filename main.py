import pypandoc

import flask
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return flask.render_template("upload.html")

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    if flask.request.method == 'POST':
        network_file = flask.request.files['file']
        stream = network_file.read()
        output = pypandoc.convert(stream, 'revealjs', format='md',
                                  extra_args=['--standalone',
                                              '--self-contained'])
        return output

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
