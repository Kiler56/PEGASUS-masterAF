const profesor = document.getElementById("profesor");
const estudiante = document.getElementById("estudiante");
const logestudiante = document.getElementById("logestudiante");
const logprofesor = document.getElementById("logprofesor");
const registerform = document.querySelector("#registerform")
const registerbtn = document.querySelector("#registerbtn")
const loginbtn = document.querySelector("#loginbtn")
import mysql from ".\mysql";


registerbtn.addEventListener("click", ()=>{
    logestudiante.classList.add("hidden");
    logprofesor.classList.add("hidden");
    registerform.classList.remove("hidden");
    
})

loginbtn.addEventListener("click", ()=>{
    registerform.classList.add("hidden");
    logprofesor.classList.remove("hidden");
    
})

profesor.addEventListener("click", ()=>{
    logestudiante.classList.add("hidden");
    logprofesor.classList.remove("hidden");
    
})

estudiante.addEventListener("click", ()=>{
    logprofesor.classList.add("hidden");
    logestudiante.classList.remove("hidden");
})



function dbLogin(email, password, usuario){
    
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

    if(usuario == 'estudiante'){
        connection.query('SELECT * from login WHERE user = "'+email+'" and password = "'+password+'"', (err, rows) =>{
            if(err) throw err
            console.log('Los datos de la tabla son estos:')
            console.log(rows)
            const usuarioLogin = rows[0]
            const usuarioname = usuarioLogin.usuario
            console.log('el nombre del usuario es ',usuarioname)
            return true
        })
    }
    else if(usuario == 'profesor'){
        connection.query('SELECT * from login WHERE user = "'+email+'" and password = "'+password+'"', (err, rows) =>{
            if(err) throw err
            console.log('Los datos de la tabla son estos:')
            console.log(rows)
            const usuarioLogin = rows[0]
            const usuarioname = usuarioLogin.usuario
            console.log('el nombre del usuario es ',usuarioname)
            return true
        })
    }
    else{
        return false
    }
    connection.end()
}

function login(){
    var email, pass
    email = document.getElementById("email");
    pass = document.getElementById("password");
    if (dbLogin(email, pass, 'profesor')) {
        window.location = "../profesor.html";
    }else{
        alert("Correo y/o contraseña incorrectos");
    }
    return false;
}

function login2(){
    var email, pass 
    email = document.getElementById("email2");
    pass = document.getElementById("password2");
    if (dbLogin(email, pass, 'estudiante')) {
        window.location = "../estudiante.html";
    }else{
        alert("Correo y/o contraseña incorrectos");
    }
    return false;
}

function register(){
    var email, pass,passconfirm,userE,userP, tipo; 
    email = document.getElementById("emailReg").value;
    pass = document.getElementById("passwordReg").value;
    passconfirm = document.getElementById("passwordConfirm").value;
    if (pass === passconfirm){
        userE = document.querySelector("#userE");
        userP = document.querySelector("#userP");
        if (userE.checked){
            tipo = "Estudiante"
        }else{
            tipo = "Profesor"
        }
        alert("se registro correctamente")
    } else{
        alert("Las contraseñas no coinciden")
    }
    return false;
}