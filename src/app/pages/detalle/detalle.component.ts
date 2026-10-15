import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="estudiante" style="padding: 20px; font-family: sans-serif; border: 1px solid #ccc; max-width: 400px; margin: 20px auto; border-radius: 8px;">
      <h2>Detalle Académico</h2>
      <p><strong>Nombre:</strong> {{ estudiante.nombre }}</p>
      <hr>
      <p><strong>Suma de notas:</strong> {{ estudiante.suma }}</p>
      <p><strong>Promedio:</strong> {{ estudiante.promedio | number:'1.2-2' }}</p>
      <p>
        <strong>Estado:</strong> 
        <span [ngStyle]="{'color': getEstadoColor(estudiante.estado), 'font-weight': 'bold'}">
          {{ estudiante.estado }}
        </span>
      </p>
      <p><strong>Observación:</strong> {{ estudiante.observacion }}</p>
      <br>
      <button routerLink="/" style="padding: 8px 15px; cursor: pointer;">Volver a la lista</button>
    </div>
  `
})
export class DetalleComponent implements OnInit {
  estudiante?: Estudiante;
  private route = inject(ActivatedRoute);
  private estService = inject(EstudianteService);

  ngOnInit() {
    const nombre = this.route.snapshot.paramMap.get('nombre');
    if (nombre) {
      this.estService.getEstudiantePorNombre(nombre).subscribe(data => {
        this.estudiante = data;
      });
    }
  }

  getEstadoColor(estado?: string): string {
    switch(estado) {
      case 'Excelente': return 'green';
      case 'Regular': return '#d4a017'; 
      case 'En riesgo': return 'red';
      default: return 'black';
    }
  }
}