const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Joi=require('joi');
const mysql=require('mysql');
const app = express();

const schema=Joi.object({
    name:Joi.string().required().min(2).max(70),
    email:Joi.string().required().email(),
    phone:Joi.string().regex(/^0[2-9]\d{7,8}$/),
    message:Joi.string().required().min(2).max(2000),
    submit:Joi.string().allow('')
});


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }));
app.use( express.static('public') );

app.get('/',  (req, res) => {
    res.render('home', {pageTitle: 'Home Page'});
});

app.get('/services',  (req, res) => {
    res.render('services', {pageTitle: 'Our Services'});
});

app.get('/contact',  (req, res) => {
    res.render('contact', {pageTitle: 'Contact Us'});
});

app.post('/contact', (req, res) => {
    const { value, error } = schema.validate(req.body); // {name: '....'}
    if (!error) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'zeev'
        });
        let sql = `INSERT INTO contacts VALUES(null,?,?,?,?,NOW())`;
        let ph = [req.body.name, req.body.email, req.body.phone, req.body.message];
        connection.query(sql, ph, (error, results, fields) => {
            if (results.affectedRows) {
                res.render('tnx', { pageTitle: 'Thanks Page' });
            } else {
                res.render('contact', { pageTitle: 'Contact Us Page' });
            }
        });
    }
});

app.use((req,res)=>{
    res.status(404);
    res.render('404',{pageTitle:'Page 404'})
})

const port = 3000;
app.listen(port, () => console.log(`Server run on port ${port}`));