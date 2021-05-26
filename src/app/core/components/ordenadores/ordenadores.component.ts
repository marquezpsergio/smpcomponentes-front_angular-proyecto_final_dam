import {Component, OnInit} from '@angular/core';
import {OrdenadorService} from '../../services/ordenador.service';
import {Ordenador} from '../../../shared/models/ordenador';

@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrls: ['./ordenadores.component.css']
})
export class OrdenadoresComponent implements OnInit {

  ordenadores: Ordenador[];

  constructor(private ordenadorService: OrdenadorService) {
  }

  ngOnInit(): void {
    this.ordenadorService.getOrdenadores().subscribe(
      ordenadores => {
        this.ordenadores = ordenadores;
      }
    );
  }
}
