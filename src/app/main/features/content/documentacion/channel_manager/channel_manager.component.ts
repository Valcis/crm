import {Component, HostListener} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {CrmLoaderService} from "../../../../../shared/services/crm-loader/crm-loader.service";

import {channelState, table} from "../../../../../shared/models/documentation/channel.model";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {ChannelManagerService} from "../../../../../shared/services/api/documentation/channel-manager.service";
import {sharedDataService} from "../../../../../shared/services/shared-data/shared-data.service";

@Component({
  selector: 'document-channel',
  templateUrl: './channelManager.component.html',
  styleUrls: ['./channelManager.component.scss',],
})
export class ChannelManagerComponent {
  @HostListener('window:resize', ['$event'])
  public detectResize(event:any): void {
    this.width = window.innerWidth;
  }
  protected channelSearch!: FormGroup;
  protected channels:any[] = [];
  protected pages:number = 10;
  protected counter:number = 0;
  protected currentPage:number = 1;
  protected maxPaginator:number = 10;
  protected width = window.innerWidth;
  protected breaking_width:number = 1100;
  protected title: string = "";

  constructor(
    private _translate: TranslateService,
    private _channel: ChannelManagerService,
    private _cookie: CookiesService,
    private _loader: CrmLoaderService,
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
    this._loader.setLoading(true);
    this.loadLoacalStorage();
    this.loadForms();
    this.getResults();
    this._loader.setLoading(false);
    this.title = this._shared.userData.menu.menuList[13].subMenu[0].descripcion
  }
  private loadLoacalStorage(){
    if(localStorage.getItem("channelPages")){
      let pag:any = localStorage.getItem("channelPages");
      this.pages = +pag;
    }
  }
  private loadForms(){
    this.channelSearch! = new FormGroup({
      idcm: new FormControl<string>(""),
      nombre: new FormControl<string>(""),
      certificado: new FormControl<string>(""),
      pci: new FormControl<string>(""),
      nombre_certificado: new FormControl<string>(""),
      comentario: new FormControl<string>(""),
      pagina: new FormControl<number>(1),
      num_resultados: new FormControl<number>(this.pages),
      orden: new FormControl<string>("fecha_creacion_ts"),
      tipo_orden: new FormControl<string>("DESC"),
    });
  }

  protected getResults(){
    this._loader.setLoading(true);
    this._channel.fetchResults(this.channelSearch.value).subscribe(result =>{
      let localData:any = result;
      let fetchResult = localData.Salida.lineas;
      this.counter = localData.Salida.datos.num_elementos;
      this.channels = [];
      let info: any[] = [];
      fetchResult.forEach((value:any) => {
        let certificadoProcessado;
        (value.certificado === undefined) ? certificadoProcessado="" : certificadoProcessado = value.certificado;
        let item:table = {
          certificado: channelState[certificadoProcessado] ,
          comentario: value.comentario,
          contacto: value.contacto,
          description: value.description ,
          idcm: value.idcm,
          nombre: value.nombre,
          nombre_certificado:value.nombre_certificado,
          pci: channelState[value.pci] ,
        };
        info.push(item);
      });
      this.channels = info;
      this._loader.setLoading(false);
    });
  }

  protected pageHandler(event:any){
    let num: number = +event;
    this.channelSearch.get("num_resultados")!.setValue(event);
    localStorage.setItem("channelPages", event);
    this.pages = num;
    this.getResults()
  }

  protected paginationHandler(event:any){
    let num: number = +event;
    this.channelSearch.get('pagina')!.setValue(event);
    this.currentPage = num;
    this.getResults()
  }
}



