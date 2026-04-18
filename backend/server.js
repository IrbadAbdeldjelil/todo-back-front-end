require('dotenv').config();
const app = require('./src/app');
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`the server is listening on http//:${HOST}/${PORT}`));