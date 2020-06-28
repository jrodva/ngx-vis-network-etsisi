import { Component } from '@angular/core';
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from 'ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.id = 'etsisiGraphNetwork';
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.options = { ...graphNetworkOptions };
  }

  isGraphNetworkReady() {
    console.log('Graph network is ready');
  }
}
