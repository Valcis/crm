import {animate, state, style, transition, trigger} from "@angular/animations";

export const Sizer = trigger('bigSmall', [
  state('*', style({width: '*'})),
  state('bg', style({width: '220px'})),
  state('sm', style({width: '70px'})),
  state('hidden', style({width: 0, opacity: 0, transform: 'translateX(-200%) translateY(-100%)'})),
  transition('* => *',[animate('0.25s')]),
]);

export const ActivePage = trigger('column', [
  state('activeCol', style({borderLeft: '4px solid #1ab394'})),
  state('inactiveCol', style({})),
  transition('inactiveCol => activeCol', [animate('0.4s')]),
]);

export const Items = trigger('items', [
  state('*', style({  top: '185px',width: '220px'})),
  state('pages-sm', style({  top: '75px',width: '70px'})),
  state('pages-big', style({  top: '185px',width: '220px'})),
  transition('* => *', [animate('0.25s')]),
]);


export const Opaque = trigger('opacityNav', [
  state('*', style({opacity:1})),
  state('opac1', style({opacity:1})),
  state('opac0', style({opacity:0})),
  transition('opac0 => opac1', [animate('0.25s')]),
]);
