//Objeto
const lenguajes = {
    compilados: ["Java", "C", "C++"],
    interpretados: ["Python", "PHP", "Javascript"]
}

const body = {
    apellidos: "Francia Minaya",
    nombres: "Jhon Edward",
    edad: 41,
    estaCasado: true,
    direccion: "Chincha",
    especialidad: "Ingeniería Software"
}

const {apellidos, nombres, edad, estaCasado, direccion, especialidad} = body
/*
const apellidos = body.apellidos
const nombres = body.nombres
const edad = body.edad
const estaCasado = body.estaCasado
const direccion = body.direccion
const especialidad = body.especialidad
*/

console.log(apellidos, nombres, edad, estaCasado, direccion, especialidad)
//console.log(lenguajes.compilados[0])