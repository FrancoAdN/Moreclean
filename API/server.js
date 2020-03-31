const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
require('dotenv').config()


//#region Config

const app = express();

function conSQL(){
    const con = mysql.createConnection({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_pwd,
        database: process.env.db,
        multipleStatements: true
    })

    return con
}

function querysql(sql, resFun){
    
    const con = conSQL();
    con.connect(function(err) {
        if (err) 
            console.error(err);

        con.query(sql, function (err, result, fields) {
            if (err)
                console.error(err);
            else
                resFun(result)

          con.end();
        });
    });

}


app.use(bodyParser.json({limit:'50mb', extended:true}))
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))

//#endregion

//#region Categories

//      Todo de categorias
app.get('/categories', (req, resp) => {
    const sql = `SELECT * FROM Categories`
    querysql(sql, (result) => resp.send(result))
})

//      Todo de una categoria en especial por id
app.get('/categoires/:id', (req, resp) => {
    const id = req.params.id
    const sql = `SELECT * FROM Categories WHERE id_cat = ${id}`
    querysql(sql, (result) => resp.send(result))

})

//      Todo de una categoria en especial por nombre
app.get('/cat/:name', (req, resp) => {
    const name = req.params.name
    const sql = `SELECT * FROM Categories WHERE category LIKE '${name}'`
    querysql(sql, (result) => resp.send(result))
})

//      Distintas categorias
app.get('/dcat', (req, resp) => {
    const sql = `SELECT DISTINCT category FROM Categories`
    querysql(sql, (result) => resp.send(result))
})

//#endregion

//#region Subcategories

//      Todo de subcategorias
app.get('/subcategories', (req, resp) => {
    const sql = `SELECT * FROM Subcategories`
    querysql(sql, (result) => resp.send(result))
})

//      Todo de una subcategoria en especial por id
app.get('/subcategoires/:id', (req, resp) => {
    const id = req.params.id
    const sql = `SELECT * FROM Subcategories WHERE id_subcat = ${id}`
    querysql(sql, (result) => resp.send(result))

})

//      Todo de una subcategoria en especial por nombre
app.get('/subcat/:name', (req, resp) => {
    const name = req.params.name
    const sql = `SELECT * FROM Subcategories WHERE subcategory LIKE '${name}'`
    querysql(sql, (result) => resp.send(result))
})

//      Distintos nombres de subcategorias
app.get('/dsubcat', (req, resp) => {
    const name = req.params.name
    const sql = `SELECT DISTINCT subcategory FROM Subcategories`
    querysql(sql, (result) => resp.send(result))
})

//      Todas las categorias con sus subcategorias
app.get('/catsub', (req, resp) => {
    const sql = `SELECT * FROM Categories c, Subcategories sc WHERE sc.id_cat = c.id_cat`
    querysql(sql, (result) => {
        resp.send(result)
    })
})

//      Una categoria en especial con sus subcategorias
app.get('/catsub/:id', (req, resp) => {
    const id = req.params.id
    const sql = `SELECT * FROM Categories c, Subcategories sc WHERE sc.id_cat = c.id_cat AND c.id_cat = ${id}`
    querysql(sql, (result) => {
        resp.send(result)
    })
})

//#endregion

//#region Products

//      Todo de productos
app.get('/products', (req, resp) => {
    const sql = `SELECT * FROM Products`
    querysql(sql, (result) => resp.send(result))
})

//      Todo de un producto en especial por id
app.get('/products/:id', (req, resp) => {
    const id = req.params.id
    const sql = `SELECT * FROM Products WHERE id_prod = ${id}`
    querysql(sql, (result) => resp.send(result))

})

//      Todo de un producto en especial por nombre
app.get('/products/:name', (req, resp) => {
    const name = req.params.name
    const sql = `SELECT * FROM Subcategories WHERE product = '${name}'`
    querysql(sql, (result) => resp.send(result))
})

//      Todo de un producto en especial por codigo
app.get('/products/:code', (req, resp) => {
    const code = req.params.code
    const sql = `SELECT * FROM Subcategories WHERE n_code = '${code}'`
    querysql(sql, (result) => resp.send(result))
})

//      Todas las subcategorias con sus productos
app.get('/subprod', (req, resp) => {
    const sql = `SELECT * FROM Products p, Subcategories sc WHERE p.id_subcat = sc.id_subcat`
    querysql(sql, (result) => {
        resp.send(result)
    })
})

//      Una subcategoria en especial con sus productos
app.get('/subprod/:id', (req, resp) => {
    const id = req.params.id
    const sql = `SELECT * FROM Products p, Subcategories sc WHERE p.id_subcat = sc.id_subcat AND sc.id_subcat = ${id}`
    querysql(sql, (result) => {
        resp.send(result)
    })
})

//      Buscador de productos
app.get('/search', (req, resp) => {
    const q = req.query.q
    const sql = `SELECT id_prod, product, image FROM Products WHERE product LIKE '${q}%' OR product = '${q}'`
    querysql(sql, (result) => resp.send(resp))

})

//#endregion


app.listen(process.env.port, () => console.log('Server running'));
