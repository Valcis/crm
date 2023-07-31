import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {CrmLoaderService} from "../../../../../shared/services/crmLoader/crm-loader.service";
import {ChannelManagerService} from "../../../../../shared/services/api/documentatnion/channelManager.service";
import {channelState, table} from "../../../../../shared/models/documentation/channel.model";

@Component({
  selector: 'document-channel',
  templateUrl: './channelManager.component.html',
  styleUrls: ['./channelManager.component.scss',],
})
export class ChannelManagerComponent {
  protected channelSearch!: FormGroup;
  protected channels:any[] = [];
  protected pages:number = 10;
  protected counter:number = 0;
  protected currentPage:number = 1;
  protected maxPaginator:number = 10;


  constructor(
    private _translate: TranslateService,
    private _channel: ChannelManagerService,
    private _cookie: CookiesService,
    private _loader: CrmLoaderService,

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
    this.getResults();

  }

  private async loadForms(){
    this.channelSearch! = new FormGroup({
      idcm: new FormControl<string>(""),
      nombre: new FormControl<string>(""),
      certificado: new FormControl<string>(""),
      pci: new FormControl<string>(""),
      nombre_certificado: new FormControl<string>(""),
      comentario: new FormControl<string>(""),
      pagina: new FormControl<number>(1),
      num_resultados: new FormControl<number>(10),
      orden: new FormControl<string>("fecha_creacion_ts"),
      tipo_orden: new FormControl<string>("DESC"),
    });
  }

  protected getResults(){

    this._channel.fetchResults(this.channelSearch.value).subscribe(result =>{
      let localData:any = result;
      let fetchResult = localData.Salida.lineas;
      this.counter = localData.Salida.datos.num_elementos;
      this.channels = [];
      let info: any[] = [];
      fetchResult.forEach((value:any) => {
        let a = value.certificado ;
        if (a === undefined){
          a=""
        }
        let item:table = {
          certificado: channelState[a] ,
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



