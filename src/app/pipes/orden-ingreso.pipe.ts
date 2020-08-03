import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: IngresoEgreso[] ): IngresoEgreso[] {
    const itemsCustom: IngresoEgreso[] = [];
    const ingreso =  items.filter((item) => item.tipo === 'ingreso');
    const egreso =  items.filter((item) => item.tipo === 'egreso');
    return itemsCustom.concat(ingreso, egreso);
  }

}
