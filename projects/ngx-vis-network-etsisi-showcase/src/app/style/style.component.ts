import { Component, OnInit } from '@angular/core';
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from '../../../../../dist/ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../assets/data';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html'
})
export class StyleComponent implements OnInit {
  private static readonly NODE_COLOR = '#2196F3';
  private static readonly BORDER_COLOR = '#7821F3';
  private static readonly EDGE_COLOR = '#F3F021';

  id: string;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;
  changeNodeColor: boolean;
  changeBorderColor: boolean;
  changeEdgeColor: boolean;

  constructor(private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.id = 'etsisiStyleGraphNetwork';
  }

  ngOnInit() {
    this.nodes = new DataSet<Node>(graphNetworkNodes);
    this.edges = new DataSet<Edge>(graphNetworkEdges);
    this.options = { ...graphNetworkOptions };
  }

  setNodeColor() {
    this.changeNodeColor = !this.changeNodeColor;
    this.updateNodeProperty(
      this.changeNodeColor,
      { color: { background: StyleComponent.NODE_COLOR } },
      { color: { background: graphNetworkNodes[0].color.background } }
    );
  }

  setBorderColor() {
    this.changeBorderColor = !this.changeBorderColor;
    this.updateNodeProperty(
      this.changeBorderColor,
      { color: { border: StyleComponent.BORDER_COLOR } },
      { color: { border: graphNetworkNodes[0].color.border } }
    );
  }

  setEdgeColor() {
    this.changeEdgeColor = !this.changeEdgeColor;
    this.updateEdgeProperty(
      this.changeEdgeColor,
      { color: { color: StyleComponent.EDGE_COLOR } },
      { color: { color: graphNetworkEdges[0].color.color } }
    );
  }

  resetGraph() {
    this.changeNodeColor = false;
    this.changeBorderColor = false;
    this.changeEdgeColor = false;
    this.ngxVisNetworkEtsisiService.resetGraph(this.id);
  }

  private updateNodeProperty(isUpdate: boolean, partialNode: Partial<Node>, previousPartialNode: Partial<Node>) {
    if (isUpdate) {
      this.nodes.map(node => {
        this.ngxVisNetworkEtsisiService.updateNode(this.id, { id: node.id, ...partialNode });
        return node;
      });
    } else {
      this.nodes.map(node => {
        this.ngxVisNetworkEtsisiService.updateNode(this.id, { id: node.id, ...previousPartialNode });
        return node;
      });
    }
  }

  private updateEdgeProperty(isUpdate: boolean, partialEdge: Partial<Edge>, previousPartialEdge: Partial<Edge>) {
    if (isUpdate) {
      this.edges.map(edge => {
        this.ngxVisNetworkEtsisiService.updateEdge(this.id, { id: edge.id, ...partialEdge });
        return edge;
      });
    } else {
      this.edges.map(edge => {
        this.ngxVisNetworkEtsisiService.updateEdge(this.id, { id: edge.id, ...previousPartialEdge });
        return edge;
      });
    }
  }
}
