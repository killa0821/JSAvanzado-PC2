import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://careli2021.github.io/api_examen/api/estudiante.json'; 

  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl).pipe(
      map(estudiantes => estudiantes.map(est => {
        const n1 = Number(est.nota1);
        const n2 = Number(est.nota2);
        const n3 = Number(est.nota3);

        const suma = n1 + n2 + n3;
        const promedio = suma / 3;
        let estado = '';
        let observacion = '';

        if (promedio >= 17) {
          estado = 'Excelente';
          observacion = 'Rendimiento sobresaliente.';
        } else if (promedio >= 13) {
          estado = 'Regular';
          observacion = 'Buen trabajo, pero hay margen de mejora.';
        } else {
          estado = 'En riesgo';
          observacion = 'Requiere tutoría y mayor dedicación urgente.';
        }

        return { ...est, suma, promedio, estado, observacion };
      }))
    );
  }

  getEstudiantePorNombre(nombre: string): Observable<Estudiante | undefined> {
    return this.getEstudiantes().pipe(
      map(estudiantes => estudiantes.find(e => e.nombre === nombre))
    );
  }
}