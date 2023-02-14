export const environment = {
  production: false,
  servers: {
    urlIntranet:"http://10.100.2.104:8080/intranet_2/public_html/index.html#/",
    urlByPass:"/ByPassServlet/",
    urlCRMServlet: "/CRMServlet/",
    urlNodeIntranet:"http://localhost:3000",//Local
    urlUsuario: "/UsersService_Intranet/",
    urlAgencias: "/AgenciasService_Intranet/",
    urlMantenimiento: "http://10.100.2.104:8080/MantenimientoService_Intranet/",
    urlHoteles: "http://10.100.2.104:8080/HotelesService_Intranet/"
  },
  files: {
    avatar:'http://10.100.2.3/CRMServlet/neo/images/'+'avatares/',
    OportunidadAgencia:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadAgencia/',
    OportunidadHotel:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadHotel/',
    OportunidadCadenaHotel:'http://10.100.2.3/CRMServlet/neo/files/private/'+'OportunidadCadenaHotel/',
    Agencia:'http://10.100.2.3/CRMServlet/neo/files/private/'+'Agencia/',
    PlanMarketing:'http://10.100.2.3/CRMServlet/neo/files/private/Campana/'+'PlanMarketing/',
    ProveedorCompras:'http://10.100.2.3/CRMServlet/neo/files/private/'+'ProveedorCompras/',
  }
};
