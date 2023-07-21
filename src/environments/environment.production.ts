export const environment = {
  production: true,
  environmentName: 'pre',
  servers: {
    //urlUsuario: "http://10.100.2.104:8080/UsersService_Intranet/",

    urlIntranet:"http://10.100.2.104:8080/intranet_2/public_html/index.html#/",
    urlByPass:"/ByPassServlet/",
    urlNodeIntranet:"http://10.100.2.104:3000",//Procuccion
    urlCRMServlet: "/CRMServlet/",
    urlUsuario: "http://10.100.2.104:8080/UsersService_Intranet/",
    urlAgencias: "http://10.100.2.104:8080/AgenciasService_Intranet/",
    urlMantenimiento: "http://10.100.2.104:8080/MantenimientoService_Intranet/",
    urlHoteles: "http://10.100.2.104:8080/HotelesService_Intranet/"

    /*urlAgencias: "http://10.100.2.104:8080/AgenciasService_Intranet/",
    urlMantenimiento: "http://10.100.2.104:8080/MantenimientoService_Intranet/",

    urlUsuario: "/UsersService_Intranet/",*/

    /*urlReservas: "/ReservasService_Intranet/",
     urlHoteles: "/HotelesService_Intranet/",

     urlIntegraciones: "/IntegracionesService_Intranet/",
     urlMantenimiento: "/MantenimientoService_Intranet/",
     urlWebService: "/WebServiceService_Intranet/",
     urlMercurio: "http://10.100.2.107:8080/Mercurio/services_Mercurio",
     urlB2BCMS: "/WebsUtilidadesService_Intranet/",
     urlB2B: "/WebsUtilidadesService_Intranet/",

     urlGiata: "/GiataService_Intranet/",
     //urlNodeIntranet:"http://10.100.2.104:3000",//Procuccion
     urlNodeIntranet:"http://127.0.0.1:3000",//Local

     //        urlMercurio:"/Mercurio/services_Mercurio",*/
    /*method: "POST"*/
  },
  files:{
    'avatar':'http://10.100.2.3/CRMServlet/neo/images/'+'avatares/',
    OportunidadAgencia:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadAgencia/',
    OportunidadHotel:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadHotel/',
    OportunidadCadenaHotel:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadCadenaHotel/',
    Agencia:'http://10.100.2.3/CRMServlet/neo/files/private/'+'Agencia/',
    PlanMarketing:'http://10.100.2.3/CRMServlet/neo/files/private/Campana/'+'PlanMarketing/',
    ProveedorCompras:'http://10.100.2.3/CRMServlet/neo/files/private/'+'ProveedorCompras/',
    ProveedorProducto:'http://10.100.2.3/CRMServlet/neo/files/private/'+'ProveedorProducto/',
  }
};
