const express = require('express');
const path = require('path');
const app = express(); 
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

//Model
const contact = mongoose.model('contact', contactSchema);


//express specofic stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//Pug Specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Endpoints
app.get('/', (req,res)=>{
    res.status(200).render('home.pug');    
});
app.get('/contact', (req,res)=>{
    res.status(200).render('contact.pug');
});
app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.status(200).send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    })
})
// app.post('/contact', (req,res)=>{
//     res.status(200).render('contact.pug');
// })

//start the server
app.listen(port, ()=>{
    console.log(`The application starta successfully on port ${port}`);
})