const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
})

connection.connect( (err) =>{
    if(err) throw err
    console.log('Conexion funciona')
})

connection.query('SELECT * from login', (err, rows) =>{
    if(err) throw err
    console.log('Los datos de la tabla son estos:')
    console.log(rows)
    const usuarioLogin = rows[0]
    const usuarioname = usuarioLogin.usuario
    console.log('el nombre del usuario es ',usuarioname)
})
connection.end()