const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'frontend/build')))
const port = 80

app.get('/', (req, res) => {
    res.send(path.join(__dirname, 'frontend/build/index.html'));
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));