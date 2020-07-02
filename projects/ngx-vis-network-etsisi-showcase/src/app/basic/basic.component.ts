import { Component, ElementRef, ViewChild } from '@angular/core';
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
  showNodes: boolean;
  showEdges: boolean;
  showIcons: boolean;
  showLabels: boolean;
  showButtons: boolean;
  @ViewChild('etsisiGraphNetwork', { read: true, static: false }) container: ElementRef;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.id = 'etsisiGraphNetwork';
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.ngxVisNetworkEtsisiService.create(container, this.nodes, this.edges, this.options);
    this.showNodes = true;
    this.showEdges = true;
    this.showIcons = true;
    this.showLabels = true;
    this.showButtons = true;
    this.options = { ...graphNetworkOptions };
  }

  activeNodes(activeNodes: boolean) {
    if (activeNodes) {
    } else {
      this.ngxVisNetworkEtsisiService.updateNode(this.id, [{ id: 4, label: 'Codessss' }]);
    }
  }

  isGraphNetworkReady() {
    console.log('Graph network is ready');
  }
}
