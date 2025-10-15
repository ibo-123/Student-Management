const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const logEvent = require('./middleware/logEvent');
const ErrorHandler = require('./middleware/errorHandler');
const corsOption = require('./config/corsConfiguration');
const PORT = process.env.PORT || 3000;

app.use(logEvent.logger);
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/studentRouter', require('./routes/studentRouter'));


app.all(/^\/.*$/, (req,res) => {
    res.status(404)
    
     if (req.accepts('json')){
        res.json({ error: 'Not Found' });
    }else{
res.type('txt').send('404 Not Found');
    } 
});
app.use(ErrorHandler);


app.listen(PORT , ()=>console.log(`The Server is Running On Port ${PORT}`));