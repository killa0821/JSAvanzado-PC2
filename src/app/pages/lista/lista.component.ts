import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Listado de Estudiantes</h2>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; text-align: center;">
        <thead style="background-color: #f4f4f4;">
          <tr>
            <th>Nombre</th>
            <th>Nota 1</th>
            <th>Nota 2</th>
            <th>Nota 3</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let est of estudiantes">
            <td>{{ est.nombre }}</td>
            <td>{{ est.nota1 }}</td>
            <td>{{ est.nota2 }}</td>
            <td>{{ est.nota3 }}</td>
            <td>
              <button [routerLink]="['/detalle', est.nombre]" style="padding: 5px 10px; cursor: pointer;">Detalle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ListaComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  private estService = inject(EstudianteService);

  ngOnInit() {
    this.estService.getEstudiantes().subscribe(data => this.estudiantes = data);
  }
}