var calculadora = ( function(){
  var display = document.getElementById('display');
  var teclas = document.querySelectorAll('.tecla');
  var longitudPermitida = 8;
  var valoresConcatenados='';
  var nuevoFormato='';
  var nuevoValor='';
  var simbolosConsiderados = ["+", "-", "*", "/", '', ' '];
  var operacionMatriz = new Array();

  var limpiarDisplay = function(valor){ // limpia a 0 o ''
    valoresConcatenados='';
    nuevoFormato='';
    nuevoValor='';
    display.innerHTML = valor;
  }

  var mostrarResultado = function(resultado){ // muestra resultado en el display
    let longitud = resultado.length;
    if(longitud>longitudPermitida){
      resultado = resultado.substring(0,longitudPermitida);
    }
    display.innerHTML = resultado;
  }

  var quitarValor = function(){ // quita valor con el backspace
    nuevoValor = nuevoValor.substring(0, nuevoValor.length -1);
    mostrarResultado(nuevoValor);
  }

  var validarLongitud = function(valor){ // validar no exceder de 8 digitos conf en la parte superior
    let longitudActual = valor.length;
    let respuesta = false;
    if(longitudActual < longitudPermitida) respuesta = true;
    return respuesta;
  }

  var seleccionarOperacion = function(operacion){ // selecciona el tipo de operacion
    operacionMatriz[0]=String(nuevoValor);
    operacionMatriz[1]=String(operacion);
    limpiarDisplay(''); //console.log(operacionMatriz);
  }

  var sumarValores = function(x, y){ // suma valores
    return operacionMatriz[3] = String(eval(x+'+'+y)); //.toFixed(2)
  }

  var restarValores = function(x, y){ // resta valores
    return operacionMatriz[3] = String(eval(x+'-'+y)); //.toFixed(2)
  }

  var multiplicarValores = function(x, y){ // multiplica valores
    return operacionMatriz[3] = String(eval(x+'*'+y)); //.toFixed(2)
  }

  var dividirValores = function(x, y){ // divide valores
    return operacionMatriz[3] = String(eval(x+'/'+y)); //.toFixed(2)
  }

  var raizCuadrada = function(){ // extrae raiz cuadrada de un número válido
    operacionMatriz[0] = String(nuevoValor);
    operacionMatriz[1] = '√';
    operacionMatriz[2] = '-';
    limpiarDisplay(''); //console.log(operacionMatriz);
    operacionMatriz[3] = String(Math.sqrt(operacionMatriz[0])); //.toFixed(2)
    operacionMatriz[3] = isNaN(operacionMatriz[3]) ? 'NO VALIDO' : operacionMatriz[3];
    mostrarResultado(operacionMatriz[3]);
    console.log(operacionMatriz);
  }

  var ejecutarOperacion = function(operacion){ // ejecuta operacion indicada
    switch(operacion){
      case '+': mostrarResultado(sumarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '-': mostrarResultado(restarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '*': mostrarResultado(multiplicarValores(operacionMatriz[0],operacionMatriz[2])); break;
      case '/': mostrarResultado(dividirValores(operacionMatriz[0],operacionMatriz[2])); break;
    }
  }

  var ejecutarEnterOIgual = function(){ // ejecuta operacion al aprepatar tecla enter física o tecla = de la web
    operacionMatriz[2]=nuevoValor; //console.log(operacionMatriz);
    ejecutarOperacion(operacionMatriz[1]);
    console.log(operacionMatriz);
    operacionMatriz[0]=operacionMatriz[3];
  }

  var volverNegativo = function(){ // vuelve negativo un número
    nuevoValor = String(eval(nuevoValor * -1));
    mostrarResultado(nuevoValor);
  }

  var agregarValor = function(valor) { // agrega el dato, válida longitud, '0', '.' y da formato correcto
    //let caracteres = display.textContent;
    let longitud = nuevoValor.length;
    let ultimo = '';
    let penultimo = '';
    let contadorPunto = 0;

    if(valor==0 && longitud==0){
      limpiarDisplay('0');
    }else{
      valoresConcatenados += String(valor);
      ultimo = valoresConcatenados.substring(valoresConcatenados.length -1 , valoresConcatenados.length);
      penultimo = valoresConcatenados.substring(valoresConcatenados.length -2 , valoresConcatenados.length -1);

      //console.log('ultimo '+ultimo+' / penultimo '+penultimo);
      let caracteresMatriz = valoresConcatenados.split('');
      //console.log('caracteresMatriz '+caracteresMatriz);
      for(let i=0; i<caracteresMatriz.length; i++){
        if(caracteresMatriz[i] == '.' ){
          contadorPunto++;
        }
      }

      if(contadorPunto>1 && valor=='.'){
        console.log('ya existe un punto: '+contadorPunto);
      }else{ //console.log('ingresa numero o primer punto: '+contadorPunto);
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
          mostrarResultado(String(nuevoValor));
        }
      }
    }
    //console.log('caracteres: '+caracteres+' / longitud: '+longitud+' / valor entrante: '+valor+' / nuevo valor: '+nuevoValor);
  }

  return {
    capturaTecladoWeb: function () { // usando teclado virtual de la web
      Array.from(teclas).forEach(tecla => {
        tecla.addEventListener("click", function(event){
          var valor = this.getAttribute('id');
          //console.log(valor);
          if(valor=='on'){
            limpiarDisplay('0');
          }else{
            switch(valor){
              case 'punto': agregarValor('.'); break;
              case 'igual': ejecutarEnterOIgual(); break;
              case 'mas': seleccionarOperacion('+'); break;
              case 'menos': seleccionarOperacion('-'); break;
              case 'por': seleccionarOperacion('*'); break;
              case 'dividido': seleccionarOperacion('/'); break;
              case 'sign': volverNegativo(); break;
              case 'raiz': raizCuadrada(); break;
              default: agregarValor(valor); break;
            }
          }
        });
      });
    },
    capturaTecladoNumerico: function () {// utilizando numérico teclado fisico
      document.addEventListener("keypress", function(event){
        var codigo = event.which || event.keyCode; // || event.charCode;
        //3console.log("Presiono: which: "+event.which+" / keyCode: "+event.keyCode+" / charCode: "+event.charCode+" / key: "+event.key);
        if(codigo === 13){
          ejecutarEnterOIgual();
        }else{
          switch(codigo){
            //case  8:  quitarValor();    break;
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
  calculadora.capturaTecladoWeb();
  calculadora.capturaTecladoNumerico();
}
