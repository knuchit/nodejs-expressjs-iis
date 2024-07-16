// generate expresss app
const express = require('express');
const app = express();

// config for iisnode
const port = process.env.PORT;

// http://localhost/
app.get('/', (req, res) => {
    const json = {
        message: 'Hello World!'
    };

    // response json
    res.json(json);

});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

