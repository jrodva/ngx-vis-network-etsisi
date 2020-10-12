import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, Locales, NgxVisNetworkEtsisiService, Node, Options } from '../../../../../dist/ngx-vis-network-etsisi';
import { graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html'
})
export class DynamicComponent implements OnInit {
  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.id = 'etsisiDynamicGraphNetwork';
  }

  ngOnInit() {
    this.nodes = new DataSet<Node>([]);
    this.edges = new DataSet<Edge>([]);
    const manipulation = {
      enabled: true,
      initiallyActive: true,
      addNode: true,
      addEdge: true,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true
    };
    this.options = {
      ...graphNetworkOptions,
      layout: {
        hierarchical: { enabled: false }
      },
      manipulation,
      locale: 'es',
      locales: DynamicComponent.getLocales()
    };
  }

  resetGraph() {
    this.ngxVisNetworkEtsisiService.resetGraph(this.id);
  }

  private static getLocales(): Locales {
    return {
      es: {
        edit: 'Editar',
        del: 'Borrar elemento seleccionado',
        back: 'Atrás',
        addNode: 'Añadir nodo',
        addEdge: 'Añadir enlace',
        editNode: 'Editar nodo',
        editEdge: 'Editar enlace',
        addDescription: 'Haz click en un espacio vacío para crear un nuevo nodo.',
        edgeDescription: 'Haz click en un nodo y arrastra el enlace a otro nodo para conectarlos.',
        editEdgeDescription: 'Haz clic en los puntos de control y arrástrelos a un nodo para conectarse a él.',
        createEdgeError: 'No es posible añadir enlaces a un cluster.',
        deleteClusterError: 'Los clusters no pueden ser borrados.',
        editClusterError: 'Los clusters no pueden ser editados.'
      }
    };
  }
}
