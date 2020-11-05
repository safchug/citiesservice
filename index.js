const app = require('./src/app');
const config = require('./config');

const port = config('port');

app.listen(port, (err)=> {
    if (err) console.log(err.message);

    console.log(`Server is running on port: ${port}`);
});
