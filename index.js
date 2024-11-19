const express = require("express")
const mysql = require("mysql2")
const app = express()
const PORT = 3001
app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Celta-1923',
    database:'expressDB',
});
db.connect();

app.get('/createProductsTable',(req,res)=>{
    let sql = 'CREATE TABLE products(id INT AUTO_INCREMENT,name_product VARCHAR(255), price INT , PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Products table created')
      })
    })
    
app.get('/createCategoriesTable',(req,res)=>{
        let sql = 'CREATE TABLE categories(id INT AUTO_INCREMENT,name_categories VARCHAR(255),description VARCHAR (100) PRIMARY KEY(id))'
          db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('Categories table created...')
          })
        })
app.get('/createProductsCategoriesTable', (req, res) => {
            let sql = `
              CREATE TABLE IF NOT EXISTS productsCategories (
                product_id INT,
                category_id INT,
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (category_id) REFERENCES categories(id),
                PRIMARY KEY (product_id, category_id)
              )
            `;
            db.query(sql, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.send('ProductsCategories table created...');
            });
          });
app.post("/newProduct", (req, res) => {
  let sql = `INSERT INTO products (name_product, price) values
    ('Product one', 'This is product number one');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Product added...");
  });
});
app.post("/newCategory", (req, res) => {
    let sql = `INSERT INTO categories (name_categories, description) values
      (Category one', 'This is category number one');`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Category added...");
    });
  });
app.get('/newProduct',(req,res)=>{
    let sql = 'SELECT * FROM products';
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
app.get('/newCategory',(req,res)=>{
    let sql = 'SELECT * FROM categories';
    db.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
app.put('/id/:id',(req,res)=>{
    let newProduct = 'Updated Product';
    let sql = `UPDATE posts SET product = '${newProduct}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Product updated...')
    })
  })
  app.put('/id/:id',(req,res)=>{
    let newCategory = 'Updated Category';
    let sql = `UPDATE posts SET category = '${newCategory}' WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
      if(err) throw err;
      res.send('Category updated...')
    })
  })
  

app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })
/* Al crear la base de datos me da error todo y no se solucionar nada :) */
app.listen(PORT,()=>console.log("Servidor levantado en el puerto "+PORT));