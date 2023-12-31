import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LinkService} from "src/app/shared/services/api/documentation/link.service"
import {TranslateService} from "@ngx-translate/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {SwalService} from "../../../../../shared/services/swal/swal.service";
import {linksTable, translateType, TypeArray, TypeModel} from "../../../../../shared/models/documentation/type.model";
import {NotificationsService} from "../../../../../shared/services/api/user/endpoints/notifications.service";
import {CrmLoaderService} from "../../../../../shared/services/crm-loader/crm-loader.service";
import {sharedDataService} from "../../../../../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'document-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss',],
})
export class LinksComponent {

  protected linkForm!: FormGroup;
  protected newForm!: FormGroup;
  protected types: TypeModel[]=TypeArray;
  protected counter: number = 0;
  protected fetchResult: any[]=[];
  protected currentPage = 1;
  protected pageSize =10;
  protected rowData: any[]= [];
  private modalRef :any;
  protected delObj: any;
  protected title: string = "";

  constructor(
    private _translate: TranslateService,
    private _link: LinkService,
    private _modal: NgbModal,
    private _cookie: CookiesService,
    private _swal: SwalService,
    private _loader: CrmLoaderService,
    private _notifier: NotificationsService,
    protected _shared: sharedDataService
  ) {
    if (_cookie.getLanguage() === '' || !_cookie.getLanguage()) {
      this._translate.use('es');
      this._cookie.setLanguage(this._translate.currentLang);
    } else {
      this._translate.use(_cookie.getLanguage());
    }
  }

  async ngOnInit(): Promise<void> {
    this.loadForms();
    this.getLinks();
    this.title = this._shared.userData.menu.menuList[13].subMenu[1].descripcion
  }

  private loadForms(){
    this.linkForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      neo_id: new FormControl<number>(0),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>(""),
    });
    this.newForm = new FormGroup({
      categoria: new FormControl<string>("Otros"),
      descripcion: new FormControl<string>(""),
      link: new FormControl<string>(""),
    });
  }

  public async getLinks(){
    this._loader.setLoading(true);
    this._link.fetchLinks(this.linkForm.value).subscribe(response =>{
      let localData:any = response;
      this.fetchResult=[];
      this.fetchResult = localData.Salida.lineas;
      this.rowData = [];
      let info: any[] = [];
      this.fetchResult.forEach((value) => {
        let a:string = value.data.categoria;
        let it:linksTable = {
          c:translateType[a],
          link:value.data.link,
          description:value.data.descripcion,
          name:value.relations[0].node.data.empl_nomb+" "+value.relations[0].node.data.empl_ape1,
          value:value};
        info.push(it);
      });
      this.counter = info.length;
      info.sort((a,b) => b.value.data.creacion_ts - a.value.data.creacion_ts);
      this.rowData = info;
      this._loader.setLoading(false);
    });
  }

  public async deleteLinks(item: any){
    this.delObj = item;
    if (this.delObj !== undefined && this.delObj.metadata !== undefined && this.delObj.metadata.neo_id !== undefined) {
      this._swal.swalConfirmationRequest(this._translate.instant('LINKS.ALERT_TITLE_DELETE'),(this._translate.instant("LINKS.ALERT_TEXT") +" : "),item.data.descripcion).then(
        (res:any)=>{
          if (res.isConfirmed){
            this._loader.setLoading(true);
            this._link.eliminateLink(this.delObj).subscribe(response=>{
              this._loader.setLoading(false);
              if (response !== undefined) {
                this._swal.swalSucces(this._translate.instant('LINKS.ALERT_RESPONSE1'),this._translate.instant('LINKS.ALERT_LINK_BORRADO'));
                this.getLinks();
              }
            })
          }
        }
      )


    }
  }

  open(content : any) {
    this.modalRef = this._modal.open(content, {
      windowClass: 'modal-element',
      size: "lg"});
  }

  public createLink() {
    if (this.newForm.value.link.length > 0 && (this.newForm.value.descripcion.length > 0)) {
      if(this.newForm.value.link.indexOf('http://')>-1 || (this.newForm.value.link.indexOf('https://')>-1)){

      } else {
        this.newForm.value.link = 'http://'+ this.newForm.value.link;
      }
      this._loader.setLoading(true);
      this._link.newLink(this.newForm.value).subscribe(response =>{
        this._loader.setLoading(false);
        if (response !== undefined) {
          this.modalRef.close();
          //TODO: Add notify
          this.getLinks();
        }
        return response;
      });

    } else {
      console.log(this.newForm.value.link)
      //TODO: Add notify (error)
    }
  }
}
