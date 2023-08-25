import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {FileService} from "../../../../../shared/services/api/documentation/file.service";
import {DragDropService} from "../../../../../shared/services/dragDrop/drag-drop.service";
import {DragDropComponent} from "../../../../../shared/components/drag-drop/drag-drop.component";
import {CrmLoaderService} from "../../../../../shared/services/crmLoader/crm-loader.service";
import {filesTable, translateType, TypeArray, TypeModel} from "../../../../../shared/models/documentation/type.model";
import {SwalService} from "../../../../../shared/services/swal/swal.service";
import {Router} from "@angular/router";
import {DateTime} from "luxon";
import {DatePipe} from "@angular/common";
import {sharedDataService} from "../../../../../shared/services/shared-data/shared-data.service";


@Component({
  selector: 'document-links',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss',],
  providers:[DatePipe]
})
export class FilesComponent {
  protected filesForm!: FormGroup;
  protected delForm!: FormGroup;
  protected newForm!: FormGroup;
  protected rowData: any[] = [];
  protected counter: number = 0;
  protected currentPage: number = 1;
  protected pageSize: number = 10;
  public types: TypeModel[]=TypeArray;
  protected file: File[]= [];
  protected filesAdded:boolean = false;
  protected forme!:FormGroup ;
  protected ts = DateTime.now();
  protected tz:any = this.ts.zoneName;
  protected utc = this.ts.offset;
  protected test = DateTime;
  protected title: string = "";




  constructor(
    private _datepipe:DatePipe,
    private _dragDrop: DragDropService,
    private _translate: TranslateService,
    private _cookie: CookiesService,
    private _fileService: FileService,
    private _Dragdrop: DragDropComponent,
    private _loader: CrmLoaderService,
    private _swal: SwalService,
    private _router: Router,
    protected _shared: sharedDataService
  ) {
      this._translate.use(_cookie.getLanguage());
  }

  ngOnInit() {
    this.initForms();
    this.getFiles();
    this.title = this._shared.userData.menu.menuList[13].subMenu[0].descripcion
  }

  private initForms(){
    this.filesForm = new FormGroup({
      type_file: new FormControl<string>('Otros'),
      neo_id: new FormControl(0),
      descripcion: new FormControl(''),
      original_name: new FormControl("")
    });
    this.delForm = new FormGroup({
      item: new FormControl()
    });
    this.newForm = new FormGroup<any>({
      categoria: new FormControl<string>('Otros'),
      descripcion: new FormControl<string>(""),
    });
  }

  protected async getFiles() {
    this._loader.setLoading(true);
    this.rowData = [];
    this._fileService.getFiles(this.filesForm.value).subscribe(response=>{
      if (response !== undefined) {
        let localData:any = response;
        let fechResult=[];
        fechResult = localData.Salida.lineas;
        this.rowData = [];
        fechResult.forEach((value :any) =>{
          let completeName = value.relations[0].node.data.empl_nomb +" " + value.relations[0].node.data.empl_ape1;
          let time = this.test.fromMillis(value.data.creacion_ts).toUTC().weekday;
          console.log(time);
          let tDiff:number=this.calculateDate(value.data.creacion_ts);
          console.log(tDiff);
          //TODO:arreglar ts(algunos funcionan y otros no)
          let it:filesTable={
            cog: {
              linked: "/CRMServlet/neo/files/private/Ficheros/" + value.data.name ,
              id: value.metadata.neo_id, name:value.data.name},
            fileName: value.data.original_name, des:value.data.descripcion,
            siz: value.data.size,
            categor:translateType[value.data.categoria],
            userName: completeName,
            dateCreation: value.data.creacion_ts+(this.utc*tDiff*1000),
          };
          this.rowData.push(it)
        });
        this.rowData.sort((a,b) => b.dateCreation - a.dateCreation);
        this._loader.setLoading(false);
        this.counter = fechResult.length;
      }

    });


  };

  private calculateDate(timestamp: number){
    let time = this.test.fromMillis(timestamp).toUTC();
    if(time.month>=8 || time.month <=3){
      if(time.month === 8){
        let daysOfMonth:any =time.daysInMonth;
        if(( daysOfMonth - time.day <= 7 && time.weekday === 6 && time.hour >= 1) || daysOfMonth - time.day  + time.weekday -6 < 0  ){
          return 30;
        }
        return 60;
      }
      if(time.month === 3){

        let daysOfMonth:any =time.daysInMonth;
        if((daysOfMonth - time.day <= 7 && time.weekday === 6 && time.hour >= 1) || daysOfMonth - time.day + time.weekday -6 < 0  ){
          return 60;
        }
        return 30;
      }
      //+1
      return 30;
    }else{
      //+2
      return 60;
    }

  }

  protected deleteFile(name:string, id:number, original_n:string, event:any) {
    event.preventDefault();
    this._swal.swalConfirmationRequest(this._translate.instant('LINKS.ALERT_TITLE_DELETE'),this._translate.instant("LINKS.ALERT_TEXT"), original_n).then(
      (res:any)=> {
        if (res.isConfirmed) {
          this._loader.setLoading(true);
          this._fileService.deleteFile(name, id).subscribe((response) => {
            this._loader.setLoading(false);
            let resp:any = response;
            if (resp !== undefined && resp.Status !== undefined && resp.Status === 'OK') {
              this._swal.swalSucces(this._translate.instant("GENERAL.DELETESUCCESS"),this._translate.instant("GENERAL.REQUESTSUCCESS"));
            } else {
              this._swal.swalError(this._translate.instant("GENERAL.DELETEFAIL"),this._translate.instant("GENERAL.REQUESTERR"));
            }
            this.getFiles();
          });
        }
      });
  };

  protected sendFile(){
    if(this.newForm.value.descripcion !== ""){
      this.send();
      this.reset();
      this.getFiles()
    }else {
      console.log("falta descripción")
      //TODO: mensaje de aviso
    }
    this.newForm.reset( {categoria: 'Otros'});
  }

  protected reciveFile(file:any):void{
    this.file = file;
    this.filesAdded = true;
  }

  private send() {

    this.forme = new FormGroup({
      type_file: new FormControl<string>('Ficheros'),
      file_name: new FormControl<string>(this.file[0].name),
      file_type: new FormControl<string>(this.file[0].type),
      size: new FormControl<number>(this.file[0].size),
      related_id: new FormControl<number>(0),
      catregoria: new FormControl<string>(this.newForm.value.categoria),
      descripcion: new FormControl<string>(this.newForm.value.descripcion),
    });
    this._loader.setLoading(true);
    this._dragDrop.sendFiles(this.forme.value).subscribe(response=>{
      var resp: any = response;
      if (resp !== undefined && resp.Status !== undefined && resp.Status === 'OK') {
        console.log("subido con éxito")
        //TODO: mensaje de exito
      }else{
        console.log("fallo en la subida")
        //TODO: mensaje de error
      }
      this._loader.setLoading(true);
    });
  };

  protected reset() {
    this.removeAllFiles();
    this.filesAdded = false;
  };

  private removeAllFiles(){
    this.file = [];
  };

  protected navigate(url:string) {
    window.location.href = "https://google.com/";

  }
}

