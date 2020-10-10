import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, Node, Options } from 'ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {
  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;
  changeNodeColor: boolean;
  changeBorderColor: boolean;
  changeEdgeColor: boolean;
  changeEdgesIcons: boolean;

  constructor() {
    console.log('constructor');
    this.id = 'etsisiStyleGraphNetwork';
  }

  ngOnInit() {
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.options = { ...graphNetworkOptions };
  }

  isGraphNetworkReady() {
    console.log('The graph is loaded');
  }

  setNodeColor() {}

  setBorderColor() {}

  setEdgeColor() {}

  setEdgesIcons() {}
}
