import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {
  faFolder,
  faShareNodes,
  faHome,
  faGamepad,
  faHospital,
  faShoppingCart,
  faGlobe,
  faCalendar
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public isExpandedFlag: boolean = true;
  crmIcon = faShareNodes;
  public isCollapsed = false;
  subsections =[
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

    console.log('Constructor de SIDENAV', this)
  }

  getSectionInfo = (sectionData: any) => "hola";

}
