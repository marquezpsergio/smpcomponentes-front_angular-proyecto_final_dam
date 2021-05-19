import {Component, OnInit} from '@angular/core';
import {Componente} from 'app/shared/models/componente';
import {Fabricante} from '../../../shared/models/fabricante';
import {FabricanteService} from '../../services/fabricante.service';
import {ComponenteService} from 'app/core/services/componente.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-componentes-categoria',
  templateUrl: './componentes-fabricante.component.html',
  styleUrls: ['./componentes-fabricante.component.css']
})
export class ComponentesFabricanteComponent implements OnInit {

  componentes: Componente[];
  fabricante: Fabricante;

  constructor(private componenteService: ComponenteService,
              private fabricanteService: FabricanteService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.componenteService.getComponentesByFabricante(id).subscribe(
          componentes => this.componentes = componentes
        );
        this.fabricanteService.getFabricanteById(id).subscribe(
          fabricante => this.fabricante = fabricante
        );
      }
    });
  }

}
