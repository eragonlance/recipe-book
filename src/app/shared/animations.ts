import { trigger, transition, animate, style, state, query, group } from '@angular/animations';

export const enterLeave = trigger('enterLeave', [
  transition(
    ':leave',
    animate(
      '200ms ease-out',
      style({
        transform: 'translateY(100px)',
        opacity: '0'
      })
    )
  ),
  transition(':enter', [
    style({ transform: 'translateX(-50px)', opacity: '0' }),
    animate(
      '200ms ease-in',
      style({
        transform: 'translateX(0)',
        opacity: '1'
      })
    )
  ])
]);

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ position: 'fixed', width: 'inherit', opacity: '0' }),
        animate(
          '0.2s ease-in',
          style({
            opacity: '1'
          })
        )
      ],
      {
        optional: true
      }
    )
  ])
]);
