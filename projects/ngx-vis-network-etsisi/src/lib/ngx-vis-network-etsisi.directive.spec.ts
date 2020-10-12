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

  it('should create an comp instance', () => {
    expect(fixture).toBeTruthy();
  });
});
