import {Component, Directive} from '@angular/core';






@Component({
  selector: 'document-paginator',
  templateUrl: './paginator.component.html',
  //styleUrls: ['./links.component.scss',]
})
export class PaginationComponent {
  private numResultados: any;
  private numPaginasArray = [];

  private rango : number[] = []
  private numElementosPorPagina: any;
  private pagSeleccionada: number| string | undefined;
  private maxPag: number;
  private functionModificarPagina

  public symbolNext = ">>";
  public symbolPrevious = "<<";
  public showUserRangNext = this.showNextRang('UP')
  public showUserRangPrevious = this.showNextRang('DOWN')


  constructor(numElementosPorPagina: '=',
              numResultados: '=',
              pagSeleccionada: '=',
              maxPag: number,
              functionModificarPagina: any
  ) {

    this.numElementosPorPagina = numElementosPorPagina;
    this.numResultados=numResultados;
    this.pagSeleccionada = pagSeleccionada;
    this.maxPag = maxPag;
    this.functionModificarPagina = functionModificarPagina;

  }

  //TODO: revise any and undefined

  getNumeroPagina() {

    var arr:string[] = [];
    if (this.rango !== undefined && this.rango.length === 2) {
      var numPag = Math.ceil(this.numResultados / this.numElementosPorPagina);
      for (var i = this.rango[0]; i <= this.rango[1]; i++) {
        if (i <= numPag) {
          arr.push(i.toString());
        }
      }
    }
    return arr;

  };


  toInteger(value :any) {

    if (typeof value === "string") {
      return parseInt(value, 10);
    } else {
      return value;
    }

  };

  buscar(pag: any) {
    this.pagSeleccionada = pag.toString();
    this.functionModificarPagina({pagina: pag.toString()});
  };

  buscarPrevious() {
    var actualPag = 1;
    if (typeof this.pagSeleccionada === "string") {
      actualPag = parseInt(this.pagSeleccionada, 10) - actualPag;
    }
    if (actualPag >= 1 && actualPag <= this.numResultados) {
      this.functionModificarPagina({pagina: actualPag.toString()});
    }
  };
  buscarNext() {
    var actualPag = 1;
    if (typeof this.pagSeleccionada === "string") {
      actualPag = parseInt(this.pagSeleccionada, 10) + actualPag;
    }
    if (actualPag >= 1 && actualPag <= this.numResultados) {
      this.pagSeleccionada = actualPag.toString();
      this.functionModificarPagina({pagina: actualPag.toString()});
    }

  };

  //---- Modificacion de los rangos para el boton ...
  showNextRang (UpDown : any) {
    if (this.pagSeleccionada === undefined) return false;
    if (this.maxPag === undefined) return false;
    if (this.numResultados === undefined) return false;
    if (this.numElementosPorPagina === undefined) return false;

    var actualPag = this.toInteger(this.pagSeleccionada);
    var maxPag = this.toInteger(this.maxPag);
    var numResultados = this.toInteger(this.numResultados);
    var numElementosPorPagina = this.toInteger(this.numElementosPorPagina);

    var numeroRangos = 0;

    if (Math.ceil(numResultados / numElementosPorPagina) <= maxPag) {
      numeroRangos = 0;
    } else {
      numeroRangos = Math.ceil(( numResultados / numElementosPorPagina) / maxPag);
    }
    var rangoActual = 0;
    var rangoActual = Math.ceil(actualPag / maxPag);

    var rangoSuperior = rangoActual * maxPag;

    var rangoInferior = rangoSuperior - (maxPag - 1);

    if (actualPag >= rangoInferior && actualPag <= rangoSuperior) {

      this.rango = [rangoInferior, rangoSuperior]; // Asignamos el rango actual

    }

    if (UpDown === 'UP' && numeroRangos >= 1 && rangoActual < numeroRangos) {

      return true;
    } else {
      if (UpDown === 'DOWN' && numeroRangos >= 1 && rangoActual > 1) {
        return true;
      }
    }
    return false;

  };

//    Buscar siguiente pagina utilizando el boton ...
  nextRang(UpDown: any) {
    var actualPag = this.toInteger(this.pagSeleccionada);
    var maxPag = this.toInteger(this.maxPag);
    var numResultados = this.toInteger(this.numResultados);
    var numElementosPorPagina = this.toInteger(this.numElementosPorPagina);

    var numeroRangos = 0;
    //if (( numResultados / numElementosPorPagina).toFixed() <= maxPag) {
    //    numeroRangos = 0;
    //} else {
    //    numeroRangos = ((( numResultados / numElementosPorPagina).toFixed()) / maxPag).toFixed();
    //}
    if (Math.ceil(numResultados / numElementosPorPagina) <= maxPag) {
      numeroRangos = 0;
    } else {
      numeroRangos = Math.ceil(( numResultados / numElementosPorPagina) / maxPag);
    }
    var rangoActual = 0;

    //Buscamos el rango activo de la actualPag
    var rangoActual = Math.ceil(actualPag / maxPag) - 1;

    if (UpDown === 'UP') {
      rangoActual = rangoActual + 1;
      this.pagSeleccionada = (rangoActual * maxPag) + 1;
      this.functionModificarPagina({pagina: this.pagSeleccionada.toString()});

    } else {
      if (UpDown === 'DOWN') {
        rangoActual = rangoActual - 1;
        this.pagSeleccionada = (rangoActual + 1) * maxPag;
        this.functionModificarPagina({pagina: this.pagSeleccionada.toString()});

      }
    }

  };



/*$watch('pagSeleccionada', function (newValue, oldValue) {
    if (newValue !== undefined) {
      showUserRangNext = $scope.showNextRang('UP');
      showUserRangPrevious = $scope.showNextRang('DOWN');
      numPaginasArray = $scope.getNumeroPagina();
    }
  });

  $scope.$watch('numResultados', function (newValue, oldValue) {
    if (newValue !== undefined) {

      $scope.showUserRangNext = $scope.showNextRang('UP');
      $scope.showUserRangPrevious = $scope.showNextRang('DOWN');
      $scope.numPaginasArray = $scope.getNumeroPagina();
    }
  });

  $scope.$watch('numElementosPorPagina', function (newValue, oldValue) {
    if (newValue !== undefined) {
      $scope.showUserRangNext = $scope.showNextRang('UP');
      $scope.showUserRangPrevious = $scope.showNextRang('DOWN');
      $scope.numPaginasArray = $scope.getNumeroPagina();
    }*/
  };
