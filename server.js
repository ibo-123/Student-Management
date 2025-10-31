const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const logEvent = require('./middleware/logEvent');
const ErrorHandler = require('./middleware/errorHandler');
const corsOption = require('./config/corsConfiguration');
const PORT = process.env.PORT || 3000;
const verifyingWeb = require('./middleware/verifyJWT')

// this controle the loger event 
app.use(logEvent.logger);
// this controlle teh web browsers that access or the web sites that use my website
app.use(cors(corsOption));
//that parses Urlincoded
app.use(express.urlencoded({ extended: false }));
// that makes to work with express
app.use(express.json());
// this is manily works for static files like html , 
app.use('/',express.static(path.join(__dirname,'public')));
//routers
app.use('/studentRegister', require('./routes/studentRegister'));
app.use('/auth', require('./routes/auth'));

app.use(verifyingWeb);
app.use('/studentRouter', require('./routes/api/studentRouter'));

console.log(process.env.ACCESS_TOKEN_SECRET);
// this for requests that are not allowed by the server send an error
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
