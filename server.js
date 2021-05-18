const express = require('express')
const mysqlDb = require('mysql');

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello world!');        
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on ${PORT}`));