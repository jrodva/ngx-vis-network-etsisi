import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from '../../../../../dist/ngx-vis-network-etsisi';
import { commonEngineer, graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    console.log('constructor');
    this.id = 'etsisiDynamicGraphNetwork';
  }

  ngOnInit() {
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.options = { ...graphNetworkOptions };
  }

  isGraphNetworkReady() {
    console.log('The graph is loaded');
  }

  addNode() {
    this.ngxVisNetworkEtsisiService.addNode(this.id, {
      id: Math.random() * 9000,
      level: Math.random() * 6,
      ...commonEngineer
    });
  }

  resetGraph() {
    this.ngxVisNetworkEtsisiService.resetGraph(this.id);
  }
}
