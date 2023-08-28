import {animate, group, query, state, style, transition, trigger} from "@angular/animations";

export const BodySize = trigger('bigSmall', [
  state('*', style({marginLeft: '*'})),
  state('bg', style({marginLeft: '220px'})),
  state('sm', style({marginLeft: '70px'})),
  state('hidden', style({marginLeft: '0px'})),
  transition('* => *',animate('0.25s')),
]);

export const SideNavSize = trigger('bigSmallSide', [
  state('*', style({width: '*'})),
  state('bg', style({width: '220px'})),
  state('sm', style({width: '70px'})),
  state('hidden', style({width: '0px'})),
  transition('sm => hidden', animate('0.25s', style({ opacity: 0,width: '0px'}))),
  transition('bg => sm',  animate('0.25s')),
  transition('sm => bg',  [group([query('#sideNav',[style({ opacity: 0,width: '0px'}),animate('0.25s')]),animate('0.25s')])]),
  transition('bg => hidden', animate('0.25s', style({ opacity: 0,width: '0px'}))),
  transition('hidden => sm', animate('0.25s')),
  transition('hidden => bg', animate('0.25s')),
]);
