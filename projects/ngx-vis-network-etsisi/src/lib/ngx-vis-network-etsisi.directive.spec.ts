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

import { NgxVisNetworkEtsisiDirective } from './ngx-vis-network-etsisi.directive';
import { Component, DebugElement } from '@angular/core';
import { DataSet, Edge, Node } from 'ngx-vis-network-etsisi';
import { graphNetworkEdges, graphNetworkNodes, graphNetworkOptions } from '../../../ngx-vis-network-etsisi-showcase/src/assets/data';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'mock-component',
  template:
    '<div [etsisiVis]="id" [etsisiVisNodes]="nodes" [etsisiVisEdges]="edges" [etsisiVisOptions]="options" (ready)="isGraphNetworkReady()"></div>'
})
class MockComponent {
  id = 'testingDirective';
  nodes = new DataSet<Node>(graphNetworkNodes);
  edges = new DataSet<Edge>(graphNetworkEdges);
  options = { ...graphNetworkOptions };

  isGraphNetworkReady() {
    console.log('The graph is loaded');
  }
}

describe('NgxVisNetworkEtsisiDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let element: DebugElement;
  let inst: NgxVisNetworkEtsisiDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, NgxVisNetworkEtsisiDirective]
    });
    fixture = TestBed.createComponent(MockComponent);
    element = fixture.debugElement.query(By.directive(NgxVisNetworkEtsisiDirective));
    inst = element.injector.get(NgxVisNetworkEtsisiDirective);
  }));

  it('should create a component instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should have the same id', () => {
    fixture.detectChanges();
    expect(inst.etsisiVis).toBe('testingDirective');
  });

  it('should have the same nodes length', () => {
    fixture.detectChanges();
    expect(inst.etsisiVisNodes.length).toBe(8);
  });

  it('should have the same edges length', () => {
    fixture.detectChanges();
    expect(inst.etsisiVisEdges.length).toBe(7);
  });

  it('should have the interaction buttons activated', () => {
    fixture.detectChanges();
    expect(inst.etsisiVisOptions.interaction.navigationButtons).toBe(true);
  });

  it('should have a hierarchic layout', () => {
    fixture.detectChanges();
    expect(inst.etsisiVisOptions.layout.hierarchical.enabled).toBe(true);
  });
});
