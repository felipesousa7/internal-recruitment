import { Provider } from '@angular/core';

export function provideMaterialIcons(): Provider[] {
  return [
    {
      provide: 'MATERIAL_ICONS',
      useValue: {
        fontSet: 'material-icons',
        fontFamily: 'Material Icons',
        fontUrl: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    }
  ];
} 