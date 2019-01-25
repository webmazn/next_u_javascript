var calculadora = ( function(){
  var display = document.getElementById('display');
  var teclas = document.querySelectorAll('.tecla');
  var valoresConcatenados='';
  var nuevoFormato='';
  var nuevoValor='';
  var simbolosConsiderados = ["+", "-", "*", "/", '', ' '];
  var operacionMatriz = new Array();

  var limpiarDisplay = function(){
    valoresConcatenados='';
    nuevoFormato='';
    nuevoValor='';
    display.innerHTML = '0';
  }

  var mostrarResultado = function(resultado){
    display.innerHTML = resultado;
  }

  var quitarValor = function(){
    nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);
    display.innerHTML = nuevoValor;
  }

  var validarLongitud = function(valor){
    let longitudPermitida = 7;
    let longitudActual = valor.length;
    let respuesta = false;
    if(longitudActual <= longitudPermitida) respuesta = true;
    return respuesta;
  }

  var seleccionarOperacion = function(operacion){
    operacionMatriz[0]=nuevoValor;
    operacionMatriz[1]=operacion;
    limpiarDisplay();
    console.log(operacionMatriz);
  }

  var sumarValores = function(x, y){
    return operacionMatriz[3] = eval(x+'+'+y).toFixed(2);
  }

  var restarValores = function(x, y){
    return operacionMatriz[3] = eval(x+'-'+y).toFixed(2);
  }

  var multiplicarValores = function(x, y){
    return operacionMatriz[3] = eval(x+'*'+y).toFixed(2);
  }

  var dividirValores = function(x, y){
    return operacionMatriz[3] = eval(x+'/'+y).toFixed(2);
  }

  var ejecutarOperacion = function(operacion){
    switch(operacion){
      case '+': mostrarResultado(sumarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '-': mostrarResultado(restarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '*': mostrarResultado(multiplicarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '/': mostrarResultado(dividirValores(operacionMatriz[0],operacionMatriz[2])); break;
    }
  }

  var agregarValor = function(valor) {
    let caracteres = display.textContent;
    let longitud = nuevoValor.length;
    let ultimo = '';
    let penultimo = '';
    let contadorPunto = 0;

    if(valor==0 && longitud==0){
      limpiarDisplay();
    }else{
      valoresConcatenados += String(valor);
      ultimo = valoresConcatenados.substring(valoresConcatenados.length -1 , valoresConcatenados.length);
      penultimo = valoresConcatenados.substring(valoresConcatenados.length -2 , valoresConcatenados.length -1);

      //console.log('ultimo '+ultimo+' / penultimo '+penultimo);

      let caracteresMatriz = valoresConcatenados.split('');
      console.log('caracteresMatriz '+caracteresMatriz);
      for(let i=0; i<caracteresMatriz.length; i++){
        if(caracteresMatriz[i] == '.' ){
          contadorPunto++;
        }
      }
      /*if(contadorPunto>1){
        console.log('ya* esxiste un punto: '+contadorPunto);
      }else{
        console.log('ingresa numero o primer punto: '+contadorPunto);
      }*/
      if(contadorPunto>1 && valor=='.'){
        console.log('ya existe un punto: '+contadorPunto);
      }else{ console.log('ingresa numero o primer punto: '+contadorPunto);
        if(simbolosConsiderados.indexOf(penultimo) != -1 && ultimo=='.'){
          nuevoFormato = '0.';
        }else if(penultimo=='.' && !/^\d+$/.test(ultimo)){//}else if(penultimo=='.' && !/^\d+$/.test(ultimo)){
          nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);//quitamos el punto
          nuevoFormato = String(valor);
        }else{
          nuevoFormato = String(valor);
        }
        //console.log(nuevoFormato);
        if(validarLongitud(nuevoValor)){
          nuevoValor += nuevoFormato;
          //display.innerHTML = String(nuevoValor);
          mostrarResultado(String(nuevoValor));
        }
      }
    }
    console.log("________________________________________________");
    //console.log('caracteres: '+caracteres+' / longitud: '+longitud+' / valor entrante: '+valor+' / nuevo valor: '+nuevoValor);
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
        //3console.log("Presiono: which: "+event.which+" / keyCode: "+event.keyCode+" / charCode: "+event.charCode+" / key: "+event.key);
        if(codigo === 13){
          //let caracteres = display.textContent; console.log("Operar: "+caracteres);
          operacionMatriz[2]=nuevoValor;
          console.log(operacionMatriz);
          ejecutarOperacion(operacionMatriz[1]);
        }else{
          switch(codigo){
            case  8:  quitarValor();    break;
            case 42: seleccionarOperacion('*'); break;
            case 43: seleccionarOperacion('+'); break;
            case 45: seleccionarOperacion('-'); break;
            case 46: agregarValor('.'); break;
            case 47: seleccionarOperacion('/'); break;
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
