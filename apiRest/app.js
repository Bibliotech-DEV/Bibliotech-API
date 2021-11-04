var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());

//conexion
var conexion = mysql.createConnection({
    host: 'mysql-proyecto.alwaysdata.net',
    user: 'proyecto',
    password: 'PrOyEcTo7891',
    database: 'proyecto_bibliotech'
});

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("conexion exitosa");
    }
});
//conexion
app.get('/', function(req, res){
    res.send('ruta de inicio');
});

//------------------------------------------------------------administrador---------------------------------------
//listar
app.get('/api', (req, res)=>{
    conexion.query('SELECT * FROM usuarios',(error, filas)=>{
        if (error) {
            throw error;
        }else{
            res.send(filas);
        }
    })
});
//listar
//listar uno solo
/*
app.get('/api/usuarios/:id', (req, res)=>{
    conexion.query('SELECT * FROM usuarios where id = ?', [req.params.id],(error, fila)=>{
        if (error) {
            throw error;
        }else{
            res.send(fila);
            //res.send(fila[0].nombre);
            
        }
    })
});
*/
//listar uno solo
// crear informacion
app.post('/api', (req, res)=>{
    let data = {id: req.body.id, nombre: req.body.nombre, apellido: req.body.apellido, contraseña: req.body.contraseña, usuario: req.body.usuario, correo: req.body.correo};
    let sql = "INSERT INTO usuarios SET ?";
    conexion.query(sql, data, (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    })
});
// crear informacion

// editar informacion

app.put('/api/:id', (req, res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre; 
    let apellido = req.body.apellido;
    let contraseña = req.body.contraseña; 
    let usuario =  req.body.usuario; 
    let correo = req.body.correo;
    let sql = "UPDATE usuarios SET nombre = ?, apellido = ?, contraseña = ?, usuario = ?, correo = ? where id = ?";
    conexion.query(sql, [nombre, apellido, contraseña, usuario, correo, id], (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    });
});

// editar informacion

// eliminar
app.delete('/api/:id', (req, res)=>{
    let id = req.params.id;
    conexion.query("DELETE FROM usuarios WHERE id = ?", [id],(error, filas)=>{
        if (error) {
            throw error;
        }else{
            res.send(filas);
        }
    });
});
// eliminar

//------------------------------------------------------------administrador---------------------------------------
//------------------------------------------------------------login---------------------------------------

app.post('/api/login', (req, res)=>{
    let data = {usuario: req.body.usuario, contraseña: req.body.contraseña};
    let sql = `SELECT * FROM usuarios where usuario = '${data.usuario}' and contraseña = '${data.contraseña}'`;
    conexion.query(sql, data, (error, results)=>{
        if (results == '') {
            console.log(error);
            res.status(400).send("no esta");
        } else {
            res.status(200).send("si esta");
        }
    })
});

//------------------------------------------------------------login---------------------------------------
//------------------------------------------------------------articulos---------------------------------------

app.get('/api/articulos', (req, res)=>{
    conexion.query('SELECT * FROM articulos',(error, filas)=>{
        if (error) {
            throw error;
        }else{
            res.send(filas);
        }
    })
});
//listar

// crear informacion
app.post('/api/articulos', (req, res)=>{
    let data = {id: req.body.id, nombre: req.body.nombre, prestamo: req.body.prestamo, nombre_editorial: req.body.nombre_editorial, nombre_autor: req.body.nombre_autor, nombre_categoria: req.body.nombre_categoria, isbn: req.body.isbn};
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, data, (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    })
});
// crear informacion

// editar informacion

app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre; 
    let prestamo = req.body.prestamo;
    let nombre_editorial = req.body.nombre_editorial; 
    let nombre_autor =  req.body.nombre_autor; 
    let nombre_categoria = req.body.nombre_categoria;
    let isbn = req.body.isbn
    let sql = "UPDATE articulos SET nombre = ?, prestamo = ?, nombre_editorial = ?, nombre_autor = ?, nombre_categoria = ?, isbn = ? where id = ?";
    conexion.query(sql, [nombre, prestamo, nombre_editorial, nombre_autor, nombre_categoria, isbn,id], (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    });
});

// editar informacion

// eliminar
app.delete('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    conexion.query("DELETE FROM articulos WHERE id = ?", [id],(error, results)=>{
        if (error) {
            throw error;
        }else{
            res.send(results);
        }
    });
});
// eliminar

// listar categorias
app.get('/categorias/:nombre_categoria', (req, res)=>{
    conexion.query('SELECT * FROM articulos where nombre_categoria = ?', [req.params.nombre_categoria],(error, fila)=>{
        if (error) {
            throw error;
        }else{
            res.send(fila);
        }
    })
});



//------------------------------------------------------------articulos---------------------------------------

const puerto = process.env.PORT || 3000;

app.listen(puerto, function(){
    console.log("servidor ok en puerto "+puerto );
});