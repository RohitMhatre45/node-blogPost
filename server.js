const express = require('express')
const artrouter = require('./routes/article')
const delrouter = require('./routes/article')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const Article = require('./models/arcticle')
const mth = require('method-override')
require('dotenv').config()



app.set('view engine', 'ejs');
app.set('views','views')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(mth('_method'))




app.use('/article',artrouter)
 



app.get('/', async(req,res)=>{

    const art = await Article.find().sort({createdAt:'desc'})
    const len = art.length
   
   
    res.render('index',{articles: art,length:len});
})

const data = process.env.MONGO

mongoose.connect(data,{
    
}).then(() =>{
    console.log('connection is succesfull!!!');
}).catch((e)=>{
    console.log("no connection");
})




const mon = process.env.PORT
app.listen(mon,() => {
  console.log(`port is running on ${mon}`)
})
