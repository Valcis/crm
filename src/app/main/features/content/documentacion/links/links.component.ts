import {Component, EventEmitter, OnInit, Output} from '@angular/core';


import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LinkService} from "src/app/shared/services/api/Documentatnion/Link.service"
import {TranslateService} from "@ngx-translate/core";
import { ModalService } from './_services/popUp.services';

@Component({
  selector: 'document-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss',]
})
export class LinksComponent {


  public linkForm!: FormGroup;
  public newForm!: FormGroup;
  public types = [
    {"k": "Hotel", "v": "LINKS.HOTEL"},
    {"k": "Agencia", "v": "LINKS.AGENCY"},
    {"k": "Otros", "v": "LINKS.OTHER"}
  ];


  public counter: number = 0;
  public page: number = 1;
  public numPages: number = 1;
  public fechResult: any[]=[];
  public table:any[] = []
  public rowData: any[]= [];
  public delObj: any;

  public columnDefs: string[] = ['LINKS.TYPE','LINKS.DESCRIPTION', 'LINKS.USER',' '];


  constructor(
    private _translate: TranslateService,
    private _linkS: LinkService,
    protected modalService: ModalService,
  ) {


    //numResultados
    //numPaginasArray = [];

    //rango
    this.numElementosPorPagina = 5;
    this.pagSeleccionada = 1;
    this.maxPag = 5;




  }



  async ngOnInit(): Promise<void> {
    this.linkForm = new FormGroup({
      categoria: new FormControl<string>(""),
      neo_id: new FormControl<number>(0),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>("")
    })
    this.newForm = new FormGroup({
      categoria: new FormControl<string>(""),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>("")
    })
  }

  public async getLinks(){
    var elements=this.linkForm.value
    let env =
      {"categoria" : elements.categoria,
      "neo_id":0,
      "descripcion": elements.descripcion,
      "link": elements.link}

    console.log('getLINKS', env)

    this._linkS.fetchLinks(env).subscribe(response =>{
      console.log(response)
      var localData:any = response
      this.fechResult=[]
      this.fechResult = localData.Salida.lineas;
      this.rowData = []
      var info: any[][] = []

      this.fechResult.forEach((value) => {

        var it = [value.data.categoria,value.data.link,value.data.descripcion, value.relations[0].node.data.empl_nomb+" "+value.relations[0].node.data.empl_ape1, value]
        info.push(it)

      })
      this.rowData = info
      this.counter = this.rowData.length



      //this.pages = Array.from(Array(this.counter/10).keys())


      //this.pageChange(1)

    });

  }
  /*public pageChange(value:number){

    this.table = this.rowData.slice((10*(value-1)), ((10*(value-1)+10)));
  }*/


  public async openDelete(item : any){
    this.modalService.open('trash')
    this.delObj = item;
  }

  public async deleteLinks(){
    if (this.delObj !== undefined && this.delObj.metadata !== undefined && this.delObj.metadata.neo_id !== undefined) {
      /*
      SweetAlert.swal({
          title: $translate.instant('SWEET_ALERT_TITLE_DELETE'),
          text: $translate.instant($translate.instant("PAG_LINKS_SWEET_ALERT_NO_PODRAS_RECUPERAR")+':' + elemento.data.descripcion),
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: $translate.instant('SWEET_ALERT_CONFIRM_DELETE'),
          cancelButtonText: $translate.instant('SWEET_ALERT_CANCEL_DELETE'),
          closeOnConfirm: false,
          closeOnCancel: true
        }*/

        //crmLoadingPage(true);

      this._linkS.rmLink(this.delObj).subscribe(response=>{
          //crmLoadingPage(false);
          if (response !== undefined) {
            this.modalService.close();
            //crmLoadingPage(true);
            /*vm.getLinks();
            SweetAlert.swal($translate.instant('SWEET_ALERT_RESPONSE1_EVENTO_DELETE'), $translate.instant('PAG_LINKS_SWEET_ALERT_LINK_BORRADO'), "success");
            */
            this.getLinks();
          }
        })

    }
  }


  public createLink() {
    if (this.newForm.value.link.length > 0 && (this.newForm.value.descripcion.length > 0)) {
      if(this.newForm.value.link.indexOf('http://')>-1 || (this.newForm.value.link.indexOf('https://')>-1)){
        this.newForm.value.link = this.newForm.value.link;
      } else {
        this.newForm.value.link = 'http://'+ this.newForm.value.link;
      }

      let request = {
        "datos_peticion":{
          "categoria":this.newForm.value.categoria,
          "descripcion":this.newForm.value.descripcion,
          "link":this.newForm.value.link
        }
      };
      //crmLoadingPage(true);
      this._linkS.newLink(request).subscribe(response =>{
        console.log(response)
        //crmLoadingPage(false);
        if (response !== undefined) {
          this.modalService.close();
          /*
          notify({
            message: $translate.instant("PAG_LINKS_NOTIFY_ANADIDO_OK"),//Texto plano
            position: 'right',//center,right
            classes: 'alert-success',//,//alert-info,alert-success,alert-warning,alert-danger
            templateUrl: 'general/common/notify.html'
          });
          */
          this.getLinks()
        }
    });

    } else {
      /*
      notify({
        message: $translate.instant("PAG_LINKS_NOTIFY_NECESARIO_LINK"),//Texto plano
        position: 'right',//center,right
        classes: 'alert-warning',//,//alert-info,alert-success,alert-warning,alert-danger
        templateUrl: 'general/common/notify.html'
      });
       */
    }
  }


















  public numResultados: any;
  public numPaginasArray = [];

  public rango : number[] = []
  public numElementosPorPagina: any;
  public pagSeleccionada: number| string | undefined = 1;
  public maxPag: number = 5;
  //private functionModificarPagina

  public symbolNext = ">>";
  public symbolPrevious = "<<";
  public showUserRangNext = this.showNextRang('UP')
  public showUserRangPrevious = this.showNextRang('DOWN')


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
    //this.functionModificarPagina({pagina: pag.toString()});
  };

  buscarPrevious() {
    var actualPag = 1;
    if (typeof this.pagSeleccionada === "string") {
      actualPag = parseInt(this.pagSeleccionada, 10) - actualPag;
    }
    if (actualPag >= 1 && actualPag <= this.numResultados) {
      //this.functionModificarPagina({pagina: actualPag.toString()});
    }
  };
  buscarNext() {
    var actualPag = 1;
    if (typeof this.pagSeleccionada === "string") {
      actualPag = parseInt(this.pagSeleccionada, 10) + actualPag;
    }
    if (actualPag >= 1 && actualPag <= this.numResultados) {
      this.pagSeleccionada = actualPag.toString();
      //this.functionModificarPagina({pagina: actualPag.toString()});
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
      //this.functionModificarPagina({pagina: this.pagSeleccionada.toString()});

    } else {
      if (UpDown === 'DOWN') {
        rangoActual = rangoActual - 1;
        this.pagSeleccionada = (rangoActual + 1) * maxPag;
       // this.functionModificarPagina({pagina: this.pagSeleccionada.toString()});

      }
    }

  };


}
