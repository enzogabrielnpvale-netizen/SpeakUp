import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataBr', standalone: true })
export class DataBrPipe implements PipeTransform {
  transform(valor: string | Date | undefined, comHora = false): string {
    if (!valor) return '';
    const data = typeof valor === 'string' ? new Date(valor) : valor;
    if (isNaN(data.getTime())) return '';

    const dataFmt = data.toLocaleDateString('pt-BR');
    if (!comHora) return dataFmt;

    const horaFmt = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dataFmt}, ${horaFmt}`;
  }
}
