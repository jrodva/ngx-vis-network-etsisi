import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from 'ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;
  showEdges: boolean;
  showIcons: boolean;
  showLabels: boolean;
  showButtons: boolean;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    console.log('constructor');
    this.id = 'etsisiGraphNetwork';
  }

  ngOnInit() {
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.options = { ...graphNetworkOptions };
    this.showEdges = true;
    this.showIcons = true;
    this.showLabels = true;
    this.showButtons = true;
  }

  isGraphNetworkReady() {
    console.log('The graph is loaded');
  }

  hideShowButtons() {
    this.showButtons = !this.showButtons;
    this.ngxVisNetworkEtsisiService.setOptions(this.id, {
      ...graphNetworkOptions,
      interaction: {
        navigationButtons: this.showButtons
      }
    });
  }

  hideShowEdges() {
    this.showEdges = !this.showEdges;
    if (this.showEdges) {
      this.ngxVisNetworkEtsisiService.setData(this.id, { edges: this.edges, nodes: this.nodes });
    } else {
      this.ngxVisNetworkEtsisiService.setData(this.id, { nodes: this.nodes });
    }
  }

  hideShowLabels() {
    this.showLabels = !this.showLabels;
    if (this.showLabels) {
      if (this.showEdges) {
        this.ngxVisNetworkEtsisiService.setData(this.id, { edges: this.edges, nodes: this.nodes });
      } else {
        this.ngxVisNetworkEtsisiService.setData(this.id, { nodes: this.nodes });
      }
    } else {
      const auxNodes = this.nodes.map(node => {
        node.label = '';
        return node;
      });
      if (this.showEdges) {
        this.ngxVisNetworkEtsisiService.setData(this.id, { edges: this.edges, nodes: auxNodes });
      } else {
        this.ngxVisNetworkEtsisiService.setData(this.id, { nodes: auxNodes });
      }
    }
  }

  hideShowIcons() {
    this.showIcons = !this.showIcons;
    if (this.showIcons) {
      this.ngxVisNetworkEtsisiService.setData(this.id, { edges: this.edges, nodes: this.nodes });
    } else {
      const auxEdges = this.edges.map(edge => {
        edge.arrows = null;
        return edge;
      });
      this.ngxVisNetworkEtsisiService.setData(this.id, { edges: auxEdges, nodes: this.nodes });
    }
  }
}
