const express = require('express')  //Framework
const mysql = require('mysql2')     //Acces DB
const bodyParser = require('body-parser')   //Interactuar con el JSON

const app = express()
app.use(bodyParser.json())

//Configuracion de acceso - env
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbmascotas'
})

//Aperturar la conexion
db.connect((err) => {
    if (err) throw err;
    console.log("Conectado a la BD de mascotas...")
})

//INICIAR EL SERVIDOR
const PORT  = 3000

// SERVICIOS WEB //
//VERBO = ACCIÓN = INTENCIÓN
//GET   :Leer
//POST  :Crear
//PUT   :Actualizar
//DELETE:Eliminar

//req (require, requerimiento)
//res (response, respuesta)
app.post('/mascotas',(req, res) => {
    //¿Y los datos que queremos guardar? -DESERIALIZACION
    const { tipo, nombre, color, pesokg } = req.body

    //? = comodin, evita los ataques por SQLinjection
    const sql= "INSERT INTO mascotas (tipo, nombre, color, pesokg) VALUES(?,?,?,?)"

    db.query(sql, [tipo, nombre, color, pesokg], (err, results) => {
        if (err) {
            return res.status(500).send({
                succes: false,
                message: 'No se concretó el registro'
            })
        }

            //¿Qué hacemos cuando logramos registrar?
            res.send({
                succes: true,
                message: 'Nueva mascota registrada',
                id: results.insertId
            })
    })
})

app.get('/mascotas',(req, res) => {
    const sql = "SELECT * FROM mascotas LIMIT 10"
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send({message: 'Error acceso a datos'})
        res.json(results)
    })
})

//Se enviará el ID por la URL (endpoint)
//SE enviarán los daots por JSON
app.put('/mascotas/:id',(req, res) => {
    const { id } = req.params
    const { tipo, nombre, color, pesokg } = req.body

    //Podemos escribir multilineas utilizando
    //Comodines van en un indice
    const sql = `
    UPDATE mascotas SET 
    tipo = ?, nombre = ?, color = ?, pesokg = ?
    WHERE id = ?`

    db.query(sql, [tipo, nombre, color, pesokg, id], (err, results) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'No se concretó la actualización'
            })
        }

        return res.send({
            success: true,
            message: 'Registro actualizado'
        })
    })
})

//En un WS para eliminar un registro, pasamos la PK como parte de la ruta
//Ejemplo: DELETE - miwebserice.com/clientes/379
app.delete('/mascotas/:id',(req, res) => {
    //¿ De donde obtenemos la id a borrar? => ENDPOINT (url)
    const { id } = req.params
    const sql = "DELETE FROM mascotas WHERE id = ?"
    db.query(sql, [id] ,(err, results) => {
        //Cláusula de GUARDA / retorno temprano
        if (err){
            res.status(500).send({
                succes: false,
                message: 'No se puede eliminar el registro'
            })
        }
        
        if (results.affectedRows == 0){
            return res.status(404).send({
                succes: false,
                message: "No existe la mascota"
            })
        }
        
        return res.send({
            succes: true,
            rows: results.affectedRows,
            message: 'Eliminado correctamente'
        })
        
    })
})
        

    
app.listen(PORT, () => {
    console.log("Servidor iniciado correctamente en http://localhost:3000")
})

