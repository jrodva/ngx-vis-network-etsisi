import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from '../../../../../dist/ngx-vis-network-etsisi';
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
      locale: 'en'
    };
  }

  resetGraph() {
    this.ngxVisNetworkEtsisiService.resetGraph(this.id);
  }
}
