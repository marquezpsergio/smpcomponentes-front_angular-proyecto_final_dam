import { Component, OnInit } from '@angular/core';
import { Componente } from '../../../shared/models/componente';
import { ComponenteService } from '../../services/componente.service';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  componentes: Componente[];

  constructor(private componenteService: ComponenteService) { }

  ngOnInit(): void {
    this.componenteService.getComponentes().subscribe(
      componentes => this.componentes = componentes
    );
  }

}
