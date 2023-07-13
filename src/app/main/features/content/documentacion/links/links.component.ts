import {Component} from '@angular/core';


import {FormControl, FormGroup} from "@angular/forms";
import {LinkService} from "src/app/shared/services/api/Documentatnion/Link.service"
import {TranslateService} from "@ngx-translate/core";
import Swal from 'sweetalert2'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";


@Component({
  selector: 'document-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss',],

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
  public fechResult: any[]=[];
  public currentPage = 1;
  public pageSize =10;
  public rowData: any[]= [];
  public table:any[] = this.rowData.slice((this.currentPage-1)*10,((this.currentPage)*10));


  public delObj: any;

  public columnDefs: string[] = ['LINKS.TYPE','LINKS.DESCRIPTION', 'LINKS.USER',' '];


  constructor(
    private _translate: TranslateService,
    private _linkS: LinkService,
    private _modalService: NgbModal,
    private _cookie: CookiesService,
  ) {
    if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
      this._translate.use('es');
      this._cookie.setLanguage(this._translate.currentLang);
    } else {
      this._translate.use(_cookie.getLanguage())
    }


  }

  private modalRef :any;



  async ngOnInit(): Promise<void> {
    this.loadForms()
    this.getLinks()
  }

  private loadForms(){
    //getLnks() form
    this.linkForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      neo_id: new FormControl<number>(0),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>("")
    });
    //newLink() form
    this.newForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>("")
    });
  }


  public async getLinks(){
    var elements=this.linkForm.value;
    let env =
      {"categoria" : elements.categoria,
      "neo_id":0,
      "descripcion": elements.descripcion,
      "link": elements.link};

    this._linkS.fetchLinks(env).subscribe(response =>{
      var localData:any = response;
      this.fechResult=[];
      this.fechResult = localData.Salida.lineas;
      this.rowData = [];
      var info: any[] = [];
      this.table=[];
      this.fechResult.forEach((value) => {
        var it = {
          c:value.data.categoria,
          link:value.data.link,
          description:value.data.descripcion,
          name:value.relations[0].node.data.empl_nomb+" "+value.relations[0].node.data.empl_ape1,
          value:value
        };
        info.push(it)
      });
      this.counter = info.length;
      info.sort((a,b) => b.value.data.creacion_ts - a.value.data.creacion_ts);
      this.rowData = info;
    });
  }


  public async deleteLinks(item: any){
    this.delObj = item;
    if (this.delObj !== undefined && this.delObj.metadata !== undefined && this.delObj.metadata.neo_id !== undefined) {

      Swal.fire({
          scrollbarPadding: false,
          heightAuto: false,
          title: this._translate.instant('LINKS.ALERT_TITLE_DELETE'),
          text: this._translate.instant(this._translate.instant("LINKS.ALERT_TEXT")+':' + item.data.descripcion),
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: this._translate.instant('LINKS.ALERT_CONFIRM'),
          cancelButtonColor: "#D0D0D0",
          cancelButtonText: this._translate.instant('LINKS.ALERT_CANCEL'),
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed){
            this._linkS.rmLink(this.delObj).subscribe(response=>{
              //crmLoadingPage(false);
              if (response !== undefined) {
                //crmLoadingPage(true);
                Swal.fire({
                  scrollbarPadding: false,
                  showDenyButton: true,
                  heightAuto: false,
                  title:this._translate.instant('LINKS.ALERT_RESPONSE1'),
                  text:this._translate.instant('LINKS.ALERT_LINK_BORRADO'),
                  icon:"success",
                  denyButtonColor: "rgb(174, 222, 244)",
                  denyButtonText:"OK",
                  showConfirmButton:false,
                  showCancelButton:false,
                });

                this.getLinks();
              }
            })
          }
        });
        //crmLoadingPage(true);
    }
  }

  //open the modal with the form to cteate a link
  open(content : any) {
    this.modalRef = this._modalService.open(content, {
      windowClass: 'modal-element',
      size: "lg"});

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
        //crmLoadingPage(false);
        if (response !== undefined) {
          this.modalRef.close();
          /*
          notify({
            message: $translate.instant("PAG_LINKS_NOTIFY_ANADIDO_OK"),//Texto plano
            position: 'right',//center,right
            classes: 'alert-success',//,//alert-info,alert-success,alert-warning,alert-danger
            templateUrl: 'general/common/notify.html'
          });
          */
          this.getLinks();
        }
        return response
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
