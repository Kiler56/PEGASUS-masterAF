const overlay = document.getElementById("overlay");
const createclassform = document.querySelector("#createclassform");
const crearclass = document.querySelector("#createclass");
const classcontainer = document.querySelector("#classes__container");
const modalsection = document.querySelector("#modalsection");

crearclass.addEventListener("click", ()=>{
    overlay.classList.add("active");
    createclassform.classList.add("crear__clase-active");
})

function closewindow(code){
        const idcerrar = document.getElementById(code)
        if (idcerrar.classList.contains("desc__evento-active")){
            idcerrar.classList.remove("desc__evento-active")
            overlay.classList.remove("second-layer")
        }else if (idcerrar.classList.contains("crear__evento-active")){
            idcerrar.classList.remove("crear__evento-active")
            overlay.classList.remove("second-layer")
        }else if (idcerrar.classList.contains("modal-active")){
            idcerrar.classList.remove("modal-active")
            overlay.classList.remove("active")
        }else{
            idcerrar.classList.remove("crear__clase-active")
            overlay.classList.remove("active")
        }
    return false;
}

function elementFromHtml(html){
    const template = document.createElement("template");
    template.innerHTML = html.trim()
    return template.content.firstElementChild;
}


function newclass(){
    const nombreclase = document.getElementById("nombre__clase").value;
    const codigo = document.getElementById("codigo__clase").value;
    const formatted = "'"+codigo+"'"
    const formatted1 = "desc"+codigo+"event"
    const formatted2 = "'desc"+codigo+"'"
    const formatted3 = "adddesc"+codigo
    const formatted4 = "'"+formatted3+"'"
    const modalid = "modal"+codigo
    const clasesita = elementFromHtml('<div class="plan click" id="'+codigo+'" onclick="return opendesc('+formatted+')"> <div class="class class--primary"> <div class="class__body"> <h3 class="class__heading text__container">'+nombreclase+'</h3> </div> </div> </div>')
    const desclasesita = elementFromHtml('<div id="'+modalid+'"><div class="modal class--primary class__desc" id="desc'+codigo+'"> <div class="class__header"> <ul class="list nav__list"> <li class="nav__item"> <h4 class="text__container class__heading">'+nombreclase+'</h4> </li> <li class="nav__item" onclick="return deleteclass('+formatted+')"> <svg class="icon icon--small icon--white click"> <use xlink:href="Images/sprite.svg#edit"></use> </svg> </li> </ul> <ul class="list nav__list"> <li class="nav__item"><p class="text__container">#'+codigo+'</p></li> <li class="nav__item"> <div class="click" onclick="return closewindow('+formatted2+')"> <svg class="icon icon--small icon--white icon--close"> <use xlink:href="Images/sprite.svg#cross"></use> </svg> </div> </li> </ul> </div> <div class="class__content"> <div class="nav nav__eventos"> <h3 class="class__title">Eventos</h3> <div class="click" onclick="return createevent('+formatted2+')"> <svg class="icon icon--small icon--white"> <use xlink:href="Images/sprite.svg#cross"></use> </svg> </div> </div> <ul class="list class__content-eventos" id="'+formatted1+'">  </ul> </div> </div> <div class="modal block--dark crear__evento" id="'+formatted3+'"> <div class="close" onclick="return closewindow('+formatted4+')"> <svg class="icon icon--small icon--white icon--close click"> <use xlink:href="Images/sprite.svg#cross"></use> </svg> </div> <form action=""> <h2 class="form__title">Crear Evento</h2> <p class="input__type">Titulo del Evento</p> <input type="text" maxlength="15" required id="nombre__evento'+codigo+'" /> <p class="input__type">Descripción del Evento</p> <textarea id="desc__asign'+codigo+'" cols="30" rows="5" maxlength="100" required ></textarea> <p class="input__type">Fecha del Evento</p> <input type="date" id="fecha__evento'+codigo+'" required /> <div> <input type="submit" class="btn btn--primary" onclick="return newevent('+formatted2+')" /> </div> </form> </div></div>')
    classcontainer.appendChild(clasesita)
    modalsection.appendChild(desclasesita)
    closewindow('createclassform')
    return false;
}

function newevent(code){
    const normalcode = code.substring(4)
    const format = code+"event"
    const eventcontainer = document.getElementById(format)
    const titulo = document.getElementById("nombre__evento"+normalcode).value
    const description = document.getElementById("desc__asign"+normalcode).value
    const date = document.getElementById("fecha__evento"+normalcode).value
    const idevento = format+ date
    const formatid = "'"+idevento+"'"
    const eventico = elementFromHtml('<li class="list-item nav__list" id="'+idevento+'a"> <div onclick="return deleteevent('+formatid+')"> <svg class="icon icon--small icon--white click"> <use xlink:href="Images/sprite.svg#bin"></use> </svg> </div> <a class="text__container evento click" onclick="return openevent('+formatid+')" >'+titulo+'</a > </li>')
    eventcontainer.appendChild(eventico)
    const desceventico = elementFromHtml('<div class="modal desc__evento class--primary-2" id="'+idevento+'"> <div class="class__content"> <div class="class__header"> <h3 class="class__title">TITULO</h3> <div class="click" onclick="return closewindow('+formatid+')" > <svg class="icon icon--small icon--white icon--close"> <use xlink:href="Images/sprite.svg#cross"></use> </svg> </div> </div> <p class="desc">'+titulo+'</p> <div> <h3 class="class__title">DESCRIPCIÓN</h3> <p class="desc">'+description+'</p> </div> <h3 class="class__title">FECHA</h3> <p class="desc">'+date+'</p> </div> </div> </div>')
    const modalid = "modal"+normalcode
    const classmodal = document.getElementById(modalid)
    classmodal.appendChild(desceventico)
    closewindow('add'+code)
    
    return false;

}

function opendesc(classid){
    const descid = document.getElementById('desc'+classid)
    overlay.classList.add("active");
    descid.classList.add("modal-active");
    return false;
}

function createevent(descid){
    const crevid = document.getElementById('add'+descid)
    overlay.classList.add("second-layer");
    crevid.classList.add("crear__evento-active");
    return false;
}

function openevent(eventid){
    const evenid = document.getElementById(eventid)
    overlay.classList.add("second-layer");
    evenid.classList.add("desc__evento-active");
    return false;
}

function deleteclass(code){
    const clase = document.getElementById(code)
    const modalclase = document.getElementById("modal"+code)
    overlay.classList.remove("active")
    clase.remove()
    modalclase.remove()
}

function deleteevent(code){
    const evento = document.getElementById(code)
    const clickevento = document.getElementById(code+"a")
    evento.remove()
    clickevento.remove()

}