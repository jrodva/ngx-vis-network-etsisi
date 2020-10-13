/*
 *   Copyright 2020 Jonathan Rodríguez Vaca
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { NgxVisNetworkEtsisiService } from './ngx-vis-network-etsisi.service';
import { Component } from '@angular/core';
import { DataSet, Edge, Node } from 'ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../../ngx-vis-network-etsisi-showcase/src/assets/data';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxVisNetworkEtsisiDirective } from './ngx-vis-network-etsisi.directive';

@Component({
  selector: 'mock-service-component',
  template:
    '<div [etsisiVis]="id" [etsisiVisNodes]="nodes" [etsisiVisEdges]="edges" [etsisiVisOptions]="options" (ready)="isGraphNetworkReady()"></div>'
})
class MockServiceComponent {
  id = 'testingService';
  nodes = new DataSet<Node>(graphNetworkNodes);
  edges = new DataSet<Edge>(graphNetworkEdges);
  options = { ...graphNetworkOptions };

  isGraphNetworkReady() {
    console.log('The graph testingService is loaded');
  }
}

describe('NgxVisNetworkEtsisiService', () => {
  let fixture: ComponentFixture<MockServiceComponent>;
  let service: NgxVisNetworkEtsisiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockServiceComponent, NgxVisNetworkEtsisiDirective]
    });
    fixture = TestBed.createComponent(MockServiceComponent);
    service = TestBed.get(NgxVisNetworkEtsisiService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be the same nodes count', () => {
    fixture.detectChanges();
    expect(service.getNodesCount('testingService')).toBe(8);
  });

  it('should be the same edges count', () => {
    fixture.detectChanges();
    expect(service.getEdgesCount('testingService')).toBe(7);
  });

  it('should be true if the id exists', () => {
    fixture.detectChanges();
    expect(service.isAnExistingGraphNetwork('testingService')).toBe(true);
  });

  it('should add a node in a graph', () => {
    fixture.detectChanges();
    let extraNode = { ...graphNetworkNodes[0] };
    extraNode.id = 3433;
    service.addNode('testingService', extraNode);
    expect(service.getNodesCount('testingService')).toBe(graphNetworkNodes.length + 1);
  });

  it('should update a node in a graph', () => {
    fixture.detectChanges();
    let updatedNode = { ...graphNetworkNodes[0] };
    updatedNode.label = 'Extra';
    service.updateNode('testingService', updatedNode);
    expect(service.getNodes('testingService').get(updatedNode.label)).toBeDefined('Extra');
  });

  it('should remove a node from a graph', () => {
    fixture.detectChanges();
    const initialLength = graphNetworkNodes.length;
    const removedNodeId = graphNetworkNodes[0].id;
    service.removeNode('testingService', removedNodeId);
    expect(service.getNodes('testingService').length).toBe(initialLength - 1);
  });

  it('should add an edge in a graph', () => {
    fixture.detectChanges();
    const initialLength = graphNetworkEdges.length;
    let newEdge = { ...graphNetworkEdges[0] };
    newEdge.id = 3400;
    service.addEdge('testingService', newEdge);
    expect(service.getEdges('testingService').length).toBe(initialLength + 1);
  });

  it('should remove an edge from a graph', () => {
    fixture.detectChanges();
    const initialLength = graphNetworkEdges.length;
    const removedEdgeId = graphNetworkEdges[0].id;
    service.removeEdge('testingService', removedEdgeId);
    expect(service.getEdges('testingService').length).toBe(initialLength - 1);
  });

  it('should set a background node for a concrete node in a graph', () => {
    fixture.detectChanges();
    let extraNode = { ...graphNetworkNodes[0] };
    const backgroundColor = '#FF0000';
    service.setBackgroundNode('testingService', extraNode.id, backgroundColor);
    expect(service.getNodes('testingService').get(extraNode.id).color).toEqual({ background: backgroundColor });
  });

  it('should reset a graph', () => {
    fixture.detectChanges();
    let extraNode = { ...graphNetworkNodes[0] };
    const initialColor = extraNode.color;
    const backgroundColor = '#FF0000';
    service.setBackgroundNode('testingService', extraNode.id, backgroundColor);
    service.resetGraph('testingService');
    expect(service.getNodes('testingService').get(extraNode.id).color).toEqual(initialColor);
  });
});
