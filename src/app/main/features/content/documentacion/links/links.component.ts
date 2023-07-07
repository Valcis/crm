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
  constructor(
    private _translate: TranslateService,
    private _linkS: LinkService,
    protected modalService: ModalService,
  ) {}
  public linkForm!: FormGroup;
  public newForm!: FormGroup;
  public types = [
    {"k": "Hotel", "v": "LINKS.HOTEL"},
    {"k": "Agencia", "v": "LINKS.AGENCY"},
    {"k": "Otros", "v": "LINKS.OTHER"}
  ];
  public counter: number = 0;
  public fechResult: any[]=[];
  public delObj: any;



  public rowData: any[]= [];
  public columnDefs: string[] = [
'LINKS.TYPE','LINKS.DESCRIPTION',
  'LINKS.USER',' '
  ];

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
      console.log(this.fechResult)
      console.log(this.rowData)
      this.rowData = []
      var info: any[] = []
      this.fechResult.forEach((value) => {
        var it = [value.data.categoria,value.data.link,value.data.descripcion, value.relations[0].node.data.empl_nomb+" "+value.relations[0].node.data.empl_ape1, value]
        info.push(it)
      })
      this.rowData = info
      this.counter = this.rowData.length
      console.log(this.rowData)

    });

  }
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

}
