// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(9000);


// const express = require('express')

// const app = express()

// const baseDir = `${__dirname}/build/`

// app.use(express.static(`${baseDir}`))

// app.get('*', (req, res) => res.sendFile('index.html', { root: baseDir }))

// const port = 4000

// app.listen(port, () => console.log(`Servidor subiu com sucesso em http://localhost:${port}`))




const express = require('express');
const path = require('path');
const app = express();
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = 3000;


app.listen(port, () => console.log(`🚀 Servidor subiu com sucesso na porta ${port}`));
