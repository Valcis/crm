import {Component} from '@angular/core';


import {FormControl, FormGroup, Validators} from "@angular/forms";

import {TranslateService} from "@ngx-translate/core";
import {CookiesService} from "../../../../../shared/services/cookies/cookies.service";
import {FileService} from "../../../../../shared/services/api/documentation/file/file.service";
import {DragDropService} from "../../../../../shared/services/api/documentation/file/dragDrop.service";


@Component({
  selector: 'document-links',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss',],

})
export class FilesComponent {
  protected filesForm!: FormGroup;
  protected delForm!: FormGroup;
  protected newForm!: FormGroup;
  protected rowData: any[] = [];
  protected counter: number = 0;
  protected currentPage: number = 1;
  protected pageSize: number = 5;
  protected columns: string[] = [" ","FILES.NAME", "FILES.DESCRIPTION", "FILES.SIZE", "FILES.CATEGORIA","FILES.USER","FILES.CREATION"];
  protected types: any[] = [{k:"Hotel", v:"FILES.HOTEL"},{k:"Agencia", v:"FILES.AGENCY"}, {k:"Otros", v:"FILES.OTHER"}];
  constructor(
    private _dragDrop: DragDropService,
    private _translate: TranslateService,
    private _cookie: CookiesService,
    private _fileService: FileService
  ) {
  }

  ngOnInit() {
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
    this.getFiles()

  }

  public async getFiles() {

    //crmLoadingPage(true);
    this.rowData = [];
    var list: any=[];
    //crmLoadingPage(false);
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
        console.log("rowData", this.rowData);
        this.counter = fechResult.length;

      }

    });


  };

  public deleteFile(name:string, id:number, original_n:string, event:any) {
    /*Swal.fire({
      title: this._translate.instant('SWEET_ALERT_TITLE_DELETE'),
      text: this._translate.instant('SWEET_ALERT_TEXT_ADJUNTO_DELETE') + " " + original_n + "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: this._translate.instant('SWEET_ALERT_CONFIRM_DELETE'),
      cancelButtonText: this._translate.instant('SWEET_ALERT_CANCEL_DELETE'),
      scrollbarPadding: false,
      heightAuto: false,
    }).then((isConfirm) => {
      if (isConfirm) {
*/

        //{"Servicio":"ficheros","Metodo":"DeleteFichero","Tipo":"","Entrada":{"type_file":"Ficheros","file_name":"1689673059526.log","neo_id":639225},"Id":"16bmd4rOuLurngAaJQyuSU80dEFt0gyTzMxU05up","URL":"","recuerdame_id":""}:
    event.preventDefault()
        //crmLoadingPage(true);
        this._fileService.deleteFile(name,id).subscribe((response) => {
          console.log(response);
          this.getFiles();
        });/*.subscribe(response=>{
          //crmLoadingPage(false);
          if (response !== undefined && response.Salida !== undefined && response.Status === 'OK') {
            Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE'), "success");
          } else {
            Swal.fire(this._translate.instant('SWEET_ALERT_RESPONSE1_ADJUNTO_DELETE_ERROR'), this._translate.instant('SWEET_ALERT_RESPONSE2_ADJUNTO_DELETE_ERROR'), "error");
          }
          *//*
        })

      }
    });
    */
  };


  public sendFile(){
  if(this.newForm.value.descripcion !== ""){
    this.send();
    this.file = [];
    this.getFiles()
  }else {
    console.log("falta descripcio")
  }

}













  protected file: File[]= [];
  protected filesAdded:boolean = false;
  protected forme!:FormGroup ;


  public send() {
    //TODO:do the thing

    this.forme = new FormGroup({
      type_file: new FormControl<string>('Ficheros'),
      file_name: new FormControl<string>(this.file[0].name),
      file_type: new FormControl<string>(this.file[0].type),
      size: new FormControl<number>(this.file[0].size),
      related_id: new FormControl<number>(0),
      catregoria: new FormControl<string>(this.newForm.value.categoria),
      descripcion: new FormControl<string>(this.newForm.value.descripcion),
    });
    this._dragDrop.sendFiles(this.forme.value).subscribe(response=>{
      if (response !== undefined) {

      }
    })
  };

  public reset() {
    //TODO: do not do the thing
    this.removeAllFiles();
    this.filesAdded = false;
  };

  private removeAllFiles(){
    this.file = [];
  };


  onSelect(event:any) {
    this.filesAdded = true;
    console.log(event);
    this.file = [];
    this.file.push(...event.addedFiles);
  }

  calcualteSize(size: number){
    let count: number = 0;

    while (size >= 1000) {
      count++;
      size=size/1000
    }
    var result:string = (Math.round(size * 100) / 100).toFixed(2);
    let units =["B","KB","MB","GB"];
    if (count > 3){
      count = 3;
    }
    var  unit: string  = units[count];
    return ("<strong> " + result + "</strong>" + unit);
  }
}
