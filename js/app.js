var calculadora = ( function(){
  var display = document.getElementById('display');
  var teclas = document.querySelectorAll('.tecla');
  var valoresConcatenados='';
  var nuevoFormato='';
  var nuevoValor='';
  var simbolosConsiderados = ["+", "-", "*", "/", '', ' '];

  var limpiarDisplay = function(){
    valoresConcatenados='';
    nuevoFormato='';
    nuevoValor='';
    display.innerHTML = '0';
  }

  var quitarValor = function(){
    nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);
    display.innerHTML = nuevoValor;
  }

  var validarLongitud = function(valor){
    let longitudPermitida = 8;
    let longitudActual = valor.length;
    let respuesta = false;
    if(longitudActual <= longitudPermitida) respuesta = true;
    return respuesta;
  }

  var agregarValor = function(valor) {
    let caracteres = display.textContent;//.split('');
    let longitud = caracteres.length;
    let ultimo = '';
    let penultimo = '';
    //localStorage.valorOperacion = valor
    if(valor==0 && longitud==1){//|| valor=='.'
      limpiarDisplay();
    }else{
      valoresConcatenados += String(valor);
      ultimo = valoresConcatenados.substring(valoresConcatenados.length -1 , valoresConcatenados.length);
      penultimo = valoresConcatenados.substring(valoresConcatenados.length -2 , valoresConcatenados.length -1);

      if(simbolosConsiderados.indexOf(penultimo) != -1 && ultimo=='.'){//!/^\d+$/.test(penultimo) > si no es un número
        nuevoFormato = '0.';
      }else if(penultimo=='.' && !/^\d+$/.test(ultimo)){//}else if(penultimo=='.' && !/^\d+$/.test(ultimo)){
        nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);//quitamos el punto
        nuevoFormato = String(valor);
      }else if(simbolosConsiderados.indexOf(penultimo) != -1 && simbolosConsiderados.indexOf(ultimo) != -1){
        nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);//quitamos el punto
        nuevoFormato = String(valor);
      }else{
        nuevoFormato = String(valor);
      }
      nuevoValor += nuevoFormato;
      if(validarLongitud(nuevoValor)) display.innerHTML = String(nuevoValor);
    }
    console.log('caracteres: '+caracteres+' / longitud: '+longitud+' / valor entrante: '+valor+' / nuevo valor: '+nuevoValor);
    console.log('ultimo '+ultimo+' / penultimo '+penultimo);
  }

  return {
    capturaTecla: function () {
      Array.from(teclas).forEach(tecla => {
        tecla.addEventListener("click", function(event){
          var valor = this.getAttribute('id');
          console.log(valor);
          if(valor=='on') limpiarDisplay();
        });
      });
    },
    capturaTecladoNumerico: function () {
      document.addEventListener("keypress", function(event){
        var codigo = event.which || event.keyCode; // || event.charCode;

        console.log("Presiono: which: "+event.which+" / keyCode: "+event.keyCode+" / charCode: "+event.charCode+" / key: "+event.key);
        if(codigo === 13){
          let caracteres = display.textContent;
          console.log("Operar: "+caracteres);
        }else{
          switch(codigo){
            case  8:  quitarValor();    break; // backspace
            case 42: agregarValor('*'); break;
            case 43: agregarValor('+'); break;
            case 45: agregarValor('-'); break;
            case 46: agregarValor('.'); break;
            case 47: agregarValor('/'); break;
            case 48: agregarValor('0'); break;
            case 49: agregarValor('1'); break;
            case 50: agregarValor('2'); break;
            case 51: agregarValor('3'); break;
            case 52: agregarValor('4'); break;
            case 53: agregarValor('5'); break;
            case 54: agregarValor('6'); break;
            case 55: agregarValor('7'); break;
            case 56: agregarValor('8'); break;
            case 57: agregarValor('9'); break;
          }
        }
      });
    }
  }
})();

window.onload=function(){
  calculadora.capturaTecla();
  calculadora.capturaTecladoNumerico();
}
