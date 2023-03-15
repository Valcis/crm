import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {faFolder, faShareNodes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public isExpandedFlag: boolean = true;
  crmIcon = faShareNodes;

  sections = [
    {description: "", icon: faFolder, id: 1, title: "Inicio", url: "asd"},
    {description: "", icon: faFolder, id: 2, title: "Test Graficos", url: "asd"},
    {description: "", icon: faFolder, id: 4, title: "Desarrollo", url: "asd"},
    {description: "", icon: faFolder, id: 5, title: "Hotel", url: "asd"},
    {description: "", icon: faFolder, id: 7, title: "Compras", url: "asd"},
    {description: "", icon: faFolder, id: 3, title: "Promotions", url: "asd"}
  ];

  constructor() {

    console.log('Constructor de SIDENAV', this)
  }

  getSectionInfo = (sectionData: any) => "hola";

}
