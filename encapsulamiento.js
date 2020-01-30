var Creador  = function(nombre,edad,altura,peso,piel){
     
     var COLORPIEL = ["CLARA","OSCURA"];

     var persona = (function () {
        return {
            edad: edad,
            nombre: nombre,
            caracteristicas: {
                altura: altura,
                peso: peso,
                piel: ""
            }
        };
     })(nombre, edad, altura, peso, COLORPIEL[piel]);
     
    function setNombre(nombre){
        persona.nombre = nombre;
    }

    function incrementEdad() {
        persona.edad++;
    }

    function setCaracterisitcas(altura,peso,piel) {
        persona.caracteristicas.altura = altura;
        persona.caracteristicas.peso = peso;
        persona.caracteristicas.piel = COLORPIEL[piel];
    }

    function getPersona(){
        return persona;
    }

    return {
        getPersona: getPersona,
        setNombre: setNombre,
        incrementEdad: incrementEdad,
        setCaracterisitcas: setCaracterisitcas
    };
};

var persona1 = Creador("pedro", 1, 1.7, 60, 1);
var persona2 = Creador("maria", 1, 1.7, 60, 1);

console.log(persona1.getPersona());
console.log(persona2.getPersona());
