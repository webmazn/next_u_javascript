/*var miCalculadora = {
	capturaNumero: function () {
    let teclas = document.querySelectorAll('.tecla');
    Array.from(teclas).forEach(tecla => {
      tecla.addEventListener("click", function(event){
        let valor = this.getAttribute('id');
        console.log(valor)
      });
    });
	}
}
*/

var miCalculadora = ( function(){
  var display = document.getElementById('display');
  var teclas = document.querySelectorAll('.tecla');

  var agregarValor = function(valor) {
    let caracteres = display.textContent;//.split('');
    let longitud = caracteres.length;
    console.log('textContent '+caracteres);
    console.log('length '+longitud);

    if(caracteres==0 && longitud==1){
      display.innerHTML = valor;
    }else{
      /*let nuevoValor = caracteres.substr(1, longitud);
      console.log(nuevoValor);*/
      display.innerHTML += valor;
      //display.innerHTML = nuevoValor;
    }
  }

  return {
    capturaTecla: function () {
      Array.from(teclas).forEach(tecla => {
        tecla.addEventListener("click", function(event){
          var valor = this.getAttribute('id');
          console.log(valor)
        });
      });
    },
    capturaTecladoNumerico: function () {
      document.addEventListener("keypress", function(event){
        var codigo = event.which || event.keyCode;
        //console.log("Presionada: " + codigo);
        if(codigo === 13){
          let caracteres = display.textContent;
          console.log("Operar: "+caracteres);
        }else{
          switch(codigo){
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
  miCalculadora.capturaTecla();
  miCalculadora.capturaTecladoNumerico();
}
