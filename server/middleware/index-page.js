'use strict';

module.exports = (req, res) => {
    // TODO: SSR
    res.send(`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Chat</title>
                <meta name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0" />
                <link rel="stylesheet" href="build/index.css" />
                <script src="https://unpkg.com/vue"></script>
            </head>
            <body>
                <div id="app"></div>

                <script src="build/index.js"></script>
            </body>
        </html>
    `);
};
