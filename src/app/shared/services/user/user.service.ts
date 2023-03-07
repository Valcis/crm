import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO: trapasar a un modelo
  rq: any = {
    ByPass: '',
    Servicio: '',
    Metodo: '',
    Tipo: '',
    Entrada: {},
    Id: '',
    setHistorial_cambios: undefined,
    URL: '',
    recuerdame_id: ''
  };

  constructor(
    private http: HttpClient,
  ) { }

  async requestUserService(inRQ: any) {
    this.rq.ByPass = 'usuario';
    this.rq.Servicio = inRQ.Servicio;
    this.rq.Metodo = inRQ.Metodo;
    this.rq.Tipo = '';
    this.rq.Entrada = inRQ.Entrada;
    this.rq.setHistorial_cambios = undefined;
    this.rq.recuerdame_id = '';
    this.rq.URL = '';
    this.rq.Id = '';

    this.http.post(environment.servers.urlByPass, JSON.stringify(this.rq)).subscribe(
      (data) => {
        console.log(data);
        if (this.rq.Status === 'OK') {
          console.log('Hemos recuperado el ususario')
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
