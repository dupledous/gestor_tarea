// cargar las tareas o desde el almacenamiento localStorage

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// function para guardar las tareas

function guardar(){
    localStorage.setItem("tareas",JSON.stringify(tareas));
}

//mostrar las tarea en pantalla

function mostrar(filtro=''){
    const lista= document.getElementById("listaTarea");
    lista.innerHTML="";

    //filtro los tarea en lista

    const filtra = tareas.filter(t=>t.Nombre && t.Nombre.toLowerCase().includes(filtro.toLowerCase()));
    filtra.forEach((tarea,index)=>{
        // crea un li con cada tarea
        const li = document.createElement("li");
        li.textContent=`${tarea.Nombre}- ${tarea.Fecha} (${tarea.Inicio} a ${tarea.Fin})`;

        if (tarea.Desc) {
            const desc = document.createElement("p");
            desc.textContent = tarea.Desc;
            li.appendChild(desc);
        }

        //crear un botton para editar tarea

        //const editar = document.createElement("button");
        //editar.textContent="Edit"
        //editar.addEventListener("click"()=>{
         //   tareas.
        //})
         // crear un botton para eliminar con cada li 

         const btnEliminar= document.createElement("button");
         btnEliminar.textContent="X";
         btnEliminar.style.marginLeft="10px";
         btnEliminar.addEventListener("click",()=>{
            tareas.splice(index,1)
            guardar();
            mostrar()
         });
         li.appendChild(btnEliminar);
        // li.appendChild(editar);
         lista.appendChild(li);
    });

};
//crear tarea
document.getElementById("formTarea").addEventListener("submit",(e)=>{
    e.preventDefault();
    console.log("furmulario enviando")
    let nombre = document.getElementById("nombre").value;
    let fecha = document.getElementById("fecha").value;
    let inicio = document.getElementById("hora").value;
    let fin = document.getElementById("fin").value;
    let descripcion = document.getElementById("comment").value;

    let nuevaTarea={
        id:Date.now(),
        Nombre:nombre,
        Fecha:fecha,
        Inicio:inicio,
        Fin:fin,
        Desc:descripcion
    };
    tareas.push(nuevaTarea);
    guardar();
    mostrar();

    document.getElementById("formTarea").reset();
});

//buscar  y filtar tarea  
document.getElementById("buscar").addEventListener("input",(e)=>{mostrar(e.target.value)});

//mostra tareas al cargar la pagina



window.addEventListener("load",()=>mostrar());
