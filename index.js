// json: https://raw.githubusercontent.com/Scavuzzo/catalogo-nodejs/main/productos.json

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    var stock = [];
    let category = [];
    let userInput = req.query.busqueda;
    if (userInput != "" && userInput != undefined) {
        fetch('https://raw.githubusercontent.com/Scavuzzo/catalogo-nodejs/main/productos.json')
            .then(res => res.json())
            .then(products => {
                stock.push(products.filter(product => (product.available == true) && (product.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1)));
                for (product of products){
                    category.push(product['category']);
                }
                let nav = [...new Set(category)];
                res.render('index.html', { products: stock[0], nav: nav })
            })
            .catch(err => alert(err))
    } else {
        fetch('https://raw.githubusercontent.com/Scavuzzo/catalogo-nodejs/main/productos.json')
            .then(res => res.json())
            .then(products => {
                stock.push(products.filter(product => product.available == true));
                for (product of products) {
                    category.push(product['category']);
                }
                let nav = [...new Set(category)];
                res.render('index.html', { products: stock[0], nav: nav })
            })
            .catch(err => alert(err))
    }
})

app.get('/p/:id/:name', (req, res) =>{
    let singleProduct = [];
    let category = [];
    fetch('https://raw.githubusercontent.com/Scavuzzo/catalogo-nodejs/main/productos.json')
        .then(res => res.json())
        .then(products => {
            singleProduct.push(products.filter(product => product.id == req.params.id));
            for (product of products) {
                category.push(product['category']);
            }
            let nav = [...new Set(category)];
            res.render('single.html', { product: singleProduct[0][0], nav: nav });
        })
        .catch(err => alert(err))
});

app.get('/c/:category', (req, res) => {
    let categoryFilter = [];
    let category = []
    fetch('https://raw.githubusercontent.com/Scavuzzo/catalogo-nodejs/main/productos.json')
        .then(res => res.json())
        .then(products => {
            categoryFilter.push(products.filter(product => (product.category == req.params.category) && (product.available == true)));
            for (product of products) {
                category.push(product['category']);
            }
            let nav = [...new Set(category)];
            res.render("categorias.html", { products: categoryFilter[0], title: req.params.category, nav: nav});
        })   
        .catch(err => alert(err))
});

app.listen(8080);