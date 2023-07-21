import {Component} from '@angular/core';


import {FormControl, FormGroup} from "@angular/forms";

import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {FileService} from "../../../../../shared/services/api/documentation/file/file.service";
import {DragDropService} from "../../../../../shared/services/api/documentation/file/dragDrop.service";
import {DragDropComponent} from "../../../../../shared/components/DragDrop/DragDrop.component";
import {CrmLoaderService} from "../../../../../shared/services/crmLoader/crm-loader.service";

@Component({
  selector: 'document-links',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss',]
})
export class FilesComponent {
  protected filesForm!: FormGroup;
  protected delForm!: FormGroup;
  protected newForm!: FormGroup;
  protected rowData: any[] = [];
  protected counter: number = 0;
  protected currentPage: number = 1;
  protected pageSize: number = 10;
  protected types: any[] = [{k:"Hotel", v:"GENERAL.HOTEL"},{k:"Agencia", v:"GENERAL.AGENCY"}, {k:"Otros", v:"GENERAL.OTHER"}];

  protected file: File[]= [];
  protected filesAdded:boolean = false;
  protected forme!:FormGroup ;

  constructor(
    private _dragDrop: DragDropService,
    private _translate: TranslateService,
    private _cookie: CookiesService,
    private _fileService: FileService,
    private _Dragdrop: DragDropComponent,
    private _loader: CrmLoaderService
  ) {
      this._translate.use(_cookie.getLanguage());
  }

  ngOnInit() {
    this.initForms();
    this.getFiles();

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
    let list: any=[];

    this._fileService.getFiles(this.filesForm.value).subscribe(response=>{
      if (response !== undefined) {
        var localData:any = response;
        var fechResult=[];
        fechResult = localData.Salida.lineas;
        this.rowData = [];
        fechResult.forEach((value :any) =>{
          var completeName = value.relations[0].node.data.empl_nomb +" " + value.relations[0].node.data.empl_ape1 +" " + value.relations[0].node.data.empl_ape2;
          //TODO: correct gmt
          var it={
            cog: {
              linked: "/CRMServlet/neo/files/private/Ficheros/" + value.data.name ,
              id: value.metadata.neo_id, name:value.data.name},
            fileName: value.data.original_name, des:value.data.descripcion,
            siz: value.data.size,
            categor:value.data.categoria,
            userName: completeName,
            dateCreation:value.data.creacion_ts };
          this.rowData.push(it)
        });
        this.rowData.sort((a,b) => b.dateCreation - a.dateCreation);
        this._loader.setLoading(false);
        this.counter = fechResult.length;

      }

    });


  };

  protected deleteFile(name:string, id:number, original_n:string, event:any) {
    //TODO:swal solicitud
    event.preventDefault();
    this._loader.setLoading(true);
      this._fileService.deleteFile(name,id).subscribe((response) => {
        this._loader.setLoading(false);
        this.getFiles();
      });
      //TODO: esperar resposta i donar swal succes o swal error
  };

  protected sendFile(){
    if(this.newForm.value.descripcion !== ""){
      this.send();
      this.reset();
      this.getFiles()
    }else {
      console.log("falta descripcio")
    }
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
      if (response !== undefined) {
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
}

