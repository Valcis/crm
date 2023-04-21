import {Component, Input, Output} from '@angular/core';
import {
  faShareNodes, faHome, faGamepad, faHospital, faShoppingCart, faGlobe, faCalendar
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public isExpandedFlag: boolean = true;
  @Input() userData: any;
  @Input() item = '';
  crmIcon = faShareNodes;
  public isCollapsed = false;


  /** EJEMPLO de GETMENU :**/



  getMenuResponseExample = {
    Salida: {
      menuList: [
        {
          "descripcion": "MENU_GRAFICOS",
          "icono": "fa-chart-bar",
          "contenido": [],
          "subMenu": [],
          "link_pag": "#/crm_graficos",
          "tipo": "MENU",
          "config_link_pag": "/crm_graficos",
          "config_state": "index.crm_graficos",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/graficos/graficos.html",
          "id": "459",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_INICIO_DESARROLLADOR",
          "icono": "fa-gamepad",
          "contenido": [],
          "subMenu": [],
          "link_pag": "#/crm_inicio_desarrollador",
          "tipo": "MENU",
          "config_link_pag": "/crm_inicio_desarrollador",
          "config_state": "index.crm_inicio_desarrollador",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/inicioDesarrollador/inicioDesarrollador.html",
          "id": "297",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_HOTEL",
          "icono": "fa-hospital-o",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_OPORTUNIDADES_HOTEL",
              "contenido": [
                {
                  "descripcion": "MENU_OPORTUNIDAD_HOTEL",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_oportunidad_hotel",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_oportunidad_hotel/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_oportunidad_hotel",
                  "id": "320",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "318",
                  "config_path_html": "content/oportunidad/oportunidadHotel/detalle/opHotel.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_oportunidad_hotel",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_oportunidad_hotel",
              "config_state": "index.crm_lista_oportunidad_hotel",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": false
              },
              "config_path_html": "content/oportunidad/oportunidadHotel/opHotel.html",
              "id": "318",
              "nivel": "2",
              "id_menu_padre": "374"
            },
            {
              "descripcion": "MENU_OPORTUNIDADES_CADENA",
              "contenido": [
                {
                  "descripcion": "MENU_OPORTUNIDAD_CADENA",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_oportunidad_cadena",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_oportunidad_cadena/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_oportunidad_cadena",
                  "id": "321",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "319",
                  "config_path_html": "content/oportunidad/oportunidadCadena/detalle/opCadenaHotel.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_oportunidad_cadena",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_oportunidad_cadena",
              "config_state": "index.crm_lista_oportunidad_cadena",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": false
              },
              "config_path_html": "content/oportunidad/oportunidadCadena/opCadena.html",
              "id": "319",
              "nivel": "2",
              "id_menu_padre": "374"
            },
            {
              "descripcion": "MENU_HOTELES",
              "contenido": [
                {
                  "descripcion": "MENU_DETALLE_HOTEL",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_hotel",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_hotel/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_hotel",
                  "id": "381",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "380",
                  "config_path_html": "content/hoteles/detalle/detalleHotel.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_hoteles",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_hoteles",
              "config_state": "index.crm_lista_hoteles",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": false
              },
              "config_path_html": "content/hoteles/hoteles.html",
              "id": "380",
              "nivel": "2",
              "id_menu_padre": "374"
            },
            {
              "descripcion": "MENU_OPORTUNIDAD_HOTEL_LATENTE",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_op_hoteles_latentes",
              "tipo": "MENU",
              "config_link_pag": "/crm_op_hoteles_latentes",
              "config_state": "index.crm_op_hoteles_latentes",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/oportunidad/hotelLatente/hotelLatente.html",
              "id": "355",
              "nivel": "2",
              "id_menu_padre": "374"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "374",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_COMPRAS",
          "icono": "fa-shopping-cart",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_COMPRAS_OPORTUNIDADES_HOTEL",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_compras_lista_oportunidad_hotel",
              "tipo": "MENU",
              "config_link_pag": "/crm_compras_lista_oportunidad_hotel",
              "config_state": "index.crm_compras_lista_oportunidad_hotel",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": true
              },
              "config_path_html": "content/oportunidad/oportunidadHotel/opHotel.html",
              "id": "572",
              "nivel": "2",
              "id_menu_padre": "569"
            },
            {
              "descripcion": "MENU_COMPRAS_OPORTUNIDADES_CADENA",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_compras_lista_oportunidad_cadena",
              "tipo": "MENU",
              "config_link_pag": "/crm_compras_lista_oportunidad_cadena",
              "config_state": "index.crm_compras_lista_oportunidad_cadena",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": true
              },
              "config_path_html": "content/oportunidad/oportunidadCadena/opCadena.html",
              "id": "573",
              "nivel": "2",
              "id_menu_padre": "569"
            },
            {
              "descripcion": "MENU_COMPRAS_HOTELES",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_compras_lista_hoteles",
              "tipo": "MENU",
              "config_link_pag": "/crm_compras_lista_hoteles",
              "config_state": "index.crm_compras_lista_hoteles",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": true
              },
              "config_path_html": "content/hoteles/hoteles.html",
              "id": "574",
              "nivel": "2",
              "id_menu_padre": "569"
            },
            {
              "descripcion": "MENU_COMPRAS_PROVEEDORES",
              "contenido": [
                {
                  "descripcion": "MENU_DETALLE_PROVEEDOR_COMPRAS",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_proveedor_compras",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_proveedor_compras/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_proveedor_compras",
                  "id": "571",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "570",
                  "config_path_html": "content/compras/proveedores/detalle/detalleProveedorCompras.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_proveedores_compra_hotel",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_proveedores_compra_hotel",
              "config_state": "index.crm_lista_proveedores_compra_hotel",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/compras/proveedores/proveedores.html",
              "id": "570",
              "nivel": "2",
              "id_menu_padre": "569"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "569",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_AGENCIA",
          "icono": "fa-globe",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_OPORTUNIDADES_AGENCIA",
              "contenido": [
                {
                  "descripcion": "MENU_OPORTUNIDAD_AGENCIA",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_oportunidad_agencia",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_oportunidad_agencia/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_oportunidad_agencia",
                  "id": "314",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "313",
                  "config_path_html": "content/oportunidad/oportunidadAgencia/detalle/opAgencia.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_oportunidad_agencia",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_oportunidad_agencia",
              "config_state": "index.crm_lista_oportunidad_agencia",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": false
              },
              "config_path_html": "content/oportunidad/oportunidadAgencia/opAgencia.html",
              "id": "313",
              "nivel": "2",
              "id_menu_padre": "376"
            },
            {
              "descripcion": "MENU_OPORTUNIDAD_AGENCIA_LATENTE",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_op_agencias_latentes",
              "tipo": "MENU",
              "config_link_pag": "/crm_op_agencias_latentes",
              "config_state": "index.crm_op_agencias_latentes",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/oportunidad/agenciaLatente/agenciaLatente.html",
              "id": "350",
              "nivel": "2",
              "id_menu_padre": "376"
            },
            {
              "descripcion": "MENU_AGENCIAS",
              "contenido": [
                {
                  "descripcion": "MENU_AGENCIA",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_agencia",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_agencia/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_agencia",
                  "id": "327",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "326",
                  "config_path_html": "content/agencias/detalle/detalleAgencia.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_agencias",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_agencias",
              "config_state": "index.crm_lista_agencias",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "modificacion_masiva": false
              },
              "config_path_html": "content/agencias/agencias.html",
              "id": "326",
              "nivel": "2",
              "id_menu_padre": "376"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "376",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_PROVEEDOR_PRODUCTO",
          "icono": "fa-briefcase",
          "contenido": [
            {
              "descripcion": "MENU_DETALLE_PROVEEDOR_PRODUCTO",
              "contenido": [],
              "link_pag": "#/index/crm_detalle_proveedor_producto",
              "tipo": "CONTENIDO",
              "config_link_pag": "/crm_detalle_proveedor_producto/:tipo/:neo_id",
              "config_state": "index.crm_detalle_proveedor_producto",
              "id": "623",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "nivel": "1",
              "permisos_elemento": {},
              "id_menu_padre": "622",
              "config_path_html": "content/proveedoresProducto/detalle/detalleProveedorProducto.html"
            }
          ],
          "subMenu": [],
          "link_pag": "#/index/crm_lista_proveedores_producto",
          "tipo": "MENU",
          "config_link_pag": "/crm_lista_proveedores_producto",
          "config_state": "index.crm_lista_proveedores_producto",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/proveedoresProducto/proveedoresProducto.html",
          "id": "622",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_PROMOCIONES",
          "icono": "fa-rebel",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_PROMOCIONES_CAMPANA",
              "contenido": [
                {
                  "descripcion": "MENU_PROMOCION_CAMPANA",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_promocion_campana",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_promocion_campana/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_promocion_campana",
                  "id": "300",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "299",
                  "config_path_html": "content/promociones/detalle/promoCampana.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_promociones_campana",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_promociones_campana",
              "config_state": "index.crm_lista_promociones_campana",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/promociones/lista/promocionesCampana.html",
              "id": "299",
              "nivel": "2",
              "id_menu_padre": "298"
            },
            {
              "descripcion": "MENU_PROMOCIONES_DESCUENTO",
              "contenido": [
                {
                  "descripcion": "MENU_PROMOCION_DESCUENTO",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_promocion_descuento",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_promocion_descuento/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_promocion_descuento",
                  "id": "303",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "302",
                  "config_path_html": "content/promociones/detalle/promoDescuento.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_promociones_descuento",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_promociones_descuento",
              "config_state": "index.crm_lista_promociones_descuento",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/promociones/lista/promocionesDescuento.html",
              "id": "302",
              "nivel": "2",
              "id_menu_padre": "298"
            },
            {
              "descripcion": "MENU_PROMOCIONES_OFERTA",
              "contenido": [
                {
                  "descripcion": "MENU_PROMOCION_OFERTA",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_promocion_oferta",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_promocion_oferta/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_promocion_oferta",
                  "id": "305",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "304",
                  "config_path_html": "content/promociones/detalle/promoOferta.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_promociones_oferta",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_promociones_oferta",
              "config_state": "index.crm_lista_promociones_oferta",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/promociones/lista/promocionesOferta.html",
              "id": "304",
              "nivel": "2",
              "id_menu_padre": "298"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "298",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_CAMPAÑAS",
          "icono": "fa-handshake-o",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_PLAN_MARKETING",
              "contenido": [
                {
                  "descripcion": "MENU_DETALLE_PLAN_MARKETING",
                  "contenido": [],
                  "link_pag": "#/index/crm_detalle_plan_marketing",
                  "tipo": "CONTENIDO",
                  "config_link_pag": "/crm_detalle_plan_marketing/:tipo/:neo_id",
                  "config_state": "index.crm_detalle_plan_marketing",
                  "id": "446",
                  "permisos": {
                    "eliminacion": true,
                    "modificacion": true,
                    "escritura": true,
                    "exportacion": true,
                    "lectura": true
                  },
                  "nivel": "1",
                  "permisos_elemento": {},
                  "id_menu_padre": "445",
                  "config_path_html": "content/campanas/planMarketing/detalle/planMarketing.html"
                }
              ],
              "subMenu": [],
              "link_pag": "#/index/crm_plan_marketing",
              "tipo": "MENU",
              "config_link_pag": "/crm_plan_marketing",
              "config_state": "index.crm_plan_marketing",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/campanas/planMarketing/planMarketing.html",
              "id": "445",
              "nivel": "2",
              "id_menu_padre": "444"
            }
          ],
          "link_pag": "#/",
          "tipo": "MENU",
          "config_link_pag": "/",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/",
          "id": "444",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_CALENDARIO",
          "icono": "fa-calendar",
          "contenido": [],
          "subMenu": [],
          "link_pag": "#/index/crm_calendario",
          "tipo": "MENU",
          "config_link_pag": "/crm_calendario",
          "config_state": "index.crm_calendario",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/calendario/calendario.html",
          "id": "315",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_ACTIVIDADES",
          "icono": "fa-tags",
          "contenido": [
            {
              "descripcion": "MENU_ACTIVIDAD",
              "contenido": [],
              "link_pag": "#/index/crm_detalle_actividad",
              "tipo": "CONTENIDO",
              "config_link_pag": "/crm_detalle_actividad/:tipo/:neo_id/:neo_id_reprogramar",
              "config_state": "index.crm_detalle_actividad",
              "id": "336",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "nivel": "1",
              "permisos_elemento": {},
              "id_menu_padre": "335",
              "config_path_html": "content/actividades/detalle/actividad.html"
            }
          ],
          "subMenu": [],
          "link_pag": "#/index/crm_lista_actividades",
          "tipo": "MENU",
          "config_link_pag": "/crm_lista_actividades",
          "config_state": "index.crm_lista_actividades",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/actividades/actividades.html",
          "id": "335",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_NOTIFICACIONES",
          "icono": "fa-bullhorn",
          "contenido": [],
          "subMenu": [],
          "link_pag": "#/index/crm_lista_notificaciones",
          "tipo": "MENU",
          "config_link_pag": "/crm_lista_notificaciones",
          "config_state": "index.crm_lista_notificaciones",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/notificaciones/notificaciones.html",
          "id": "357",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_CONTACTOS",
          "icono": "fa-users",
          "contenido": [
            {
              "descripcion": "MENU_CONTACTO",
              "contenido": [],
              "link_pag": "#/index/crm_detalle_contacto",
              "tipo": "CONTENIDO",
              "config_link_pag": "/crm_detalle_contacto/:tipo/:neo_id",
              "config_state": "index.crm_detalle_contacto",
              "id": "334",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "nivel": "1",
              "permisos_elemento": {},
              "id_menu_padre": "333",
              "config_path_html": "content/contactos/detalle/contacto.html"
            }
          ],
          "subMenu": [],
          "link_pag": "#/index/crm_lista_contactos",
          "tipo": "MENU",
          "config_link_pag": "/crm_lista_contactos",
          "config_state": "index.crm_lista_contactos",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {},
          "config_path_html": "content/contactos/contactos.html",
          "id": "333",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_REPORTS",
          "icono": "fa-bar-chart",
          "contenido": [],
          "subMenu": [],
          "link_pag": "#/index/crm_reports",
          "tipo": "MENU",
          "config_link_pag": "/crm_reports",
          "config_state": "index.crm_reports",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "permisos_elemento": {
            "hotel": true,
            "agencia": true
          },
          "config_path_html": "content/reports/reports.html",
          "id": "395",
          "nivel": "1",
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_DOCUMENTACION",
          "icono": "fa-file",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_FICHEROS",
              "icono": "fa-upload",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_ficheros",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_ficheros",
              "config_state": "index.crm_lista_ficheros",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/ficheros/ficheros.html",
              "id": "365",
              "nivel": "2",
              "id_menu_padre": "375"
            },
            {
              "descripcion": "MENU_LINKS",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_lista_links",
              "tipo": "MENU",
              "config_link_pag": "/crm_lista_links",
              "config_state": "index.crm_lista_links",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/documentacion/links/links.html",
              "id": "382",
              "nivel": "2",
              "id_menu_padre": "375"
            },
            {
              "descripcion": "MENU_CHANNEL_MANAGER",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_channelmanager",
              "tipo": "MENU",
              "config_link_pag": "/crm_channelmanager",
              "config_state": "index.crm_channelmanager",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/documentacion/channelmanager/channelmanager.html",
              "id": "386",
              "nivel": "2",
              "id_menu_padre": "375"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "375",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        },
        {
          "descripcion": "MENU_MANTENIMIENTO",
          "icono": "fa-life-ring",
          "contenido": [],
          "subMenu": [
            {
              "descripcion": "MENU_RELACIONES_USUARIOS",
              "icono": "fa-users",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_relaciones_usuarios",
              "tipo": "MENU",
              "config_link_pag": "/crm_relaciones_usuarios",
              "config_state": "index.crm_relaciones_usuarios",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/usuarios/gestionRelacionesUsuarios/gestionRelacionesUsuarios.html",
              "id": "331",
              "nivel": "2",
              "id_menu_padre": "342"
            },
            {
              "descripcion": "MENU_MANTENIMIENTO_CARGOS_CONTACTOS",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_mantenimiento_cargos_contactos",
              "tipo": "MENU",
              "config_link_pag": "/crm_mantenimiento_cargos_contactos",
              "config_state": "index.crm_mantenimiento_cargos_contactos",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/mantenimiento/cargosContactos/cargosContactos.html",
              "id": "460",
              "nivel": "2",
              "id_menu_padre": "342"
            },
            {
              "descripcion": "MENU_MANTENIMIENTO_PROVE_OP_AGE",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_mantenimiento_prove_trabaja_opage",
              "tipo": "MENU",
              "config_link_pag": "/crm_mantenimiento_prove_trabaja_opage",
              "config_state": "index.crm_mantenimiento_prove_trabaja_opage",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/mantenimiento/proveTrabajaOpAge/proveTrabajaOpAge.html",
              "id": "343",
              "nivel": "2",
              "id_menu_padre": "342"
            },
            {
              "descripcion": "MENU_MANTENIMIENTO_USER_BAJA",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_mantenimiento_user_baja",
              "tipo": "MENU",
              "config_link_pag": "/crm_mantenimiento_user_baja",
              "config_state": "index.crm_mantenimiento_user_baja",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {},
              "config_path_html": "content/mantenimiento/userBajaTemporal/userBajaTemporal.html",
              "id": "383",
              "nivel": "2",
              "id_menu_padre": "342"
            },
            {
              "descripcion": "MENU_MANTENIMIENTO_DESTINATARIOS_EMAILS",
              "contenido": [],
              "subMenu": [],
              "link_pag": "#/index/crm_mantenimiento_destinatarios_emails",
              "tipo": "MENU",
              "config_link_pag": "/crm_mantenimiento_destinatarios_emails",
              "config_state": "index.crm_mantenimiento_destinatarios_emails",
              "permisos": {
                "eliminacion": true,
                "modificacion": true,
                "escritura": true,
                "exportacion": true,
                "lectura": true
              },
              "permisos_elemento": {
                "nuevo_tipo": true
              },
              "config_path_html": "content/mantenimiento/destinatariosEmails/destinatariosEmails.html",
              "id": "422",
              "nivel": "2",
              "id_menu_padre": "342"
            }
          ],
          "link_pag": "#",
          "tipo": "MENU",
          "config_link_pag": "/",
          "id": "342",
          "permisos": {
            "eliminacion": true,
            "modificacion": true,
            "escritura": true,
            "exportacion": true,
            "lectura": true
          },
          "nivel": "1",
          "permisos_elemento": {},
          "id_menu_padre": "0"
        }
      ]
    },
    "Metodo": "GetMenu",
    "Servicio": "menu",
    "Id": "Z7I9L6IIOvUCQ7Cb1Yig6OJyEp4wQoLDe2NZC3fl",
    "URL": ""
  }


  subsections = [
    {description: "", isContent: true, id: 5, title: "Opotunidades", url: "opotunidades"},
    {description: "", isContent: true, id: 6, title: "Agencias latentes", url: "agencias_latentes"},
    {description: "", isContent: true, id: 7, title: "Agencias", url: "agencias"},
  ];

  sections = [
    {description: "", isContent: true, icon: faHome, id: 1, title: "Inicio", url: "inicio"},
    {description: "", isContent: true, icon: faGamepad, id: 2, title: "Developper Test", url: "desarrollo"},
    {description: "", isContent: false, icon: faHospital, id: 4, title: "Hotel", url: "hotel"},
    {description: "", isContent: true, icon: faShoppingCart, id: 9, title: "Compras", url: "compras"},
    {description: "", isContent: true, icon: faGlobe, id: 11, title: "Agencias", url: "agencias"},
    {description: "", isContent: true, icon: faCalendar, id: 12, title: "Calendario", url: "calendario"}
  ];

  constructor() {

    console.log('Constructor de SIDENAV, hay menu??', this.userData)
    console.log("-------------",this.item);
  }

  getSectionInfo = (sectionData: any) => "hola";

}
