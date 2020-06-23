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

import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataSet, Edge, Node, Options } from 'vis-network/standalone';
import { NgxVisNetworkEtsisiService } from './ngx-vis-network-etsisi.service';

/**
 * Using this directive the graph will be dynamically added inside the chosen container.
 * @export
 * @class NgxVisNetworkEtsisiDirective
 * @implements OnInit
 * @implements OnDestroy
 */
@Directive({
  selector: '[etsisiVis]'
})
export class NgxVisNetworkEtsisiDirective implements OnInit, OnDestroy {
  /**
   * Graph network id.
   * @type {string}
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVis: string;
  /**
   * Graph network nodes.
   * @type {DataSet<Node>}
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisNodes: DataSet<Node>;
  /**
   * Graph network edges.
   * @type {DataSet<Edge>}
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisEdges: DataSet<Edge>;
  /**
   * Graph network id.
   * @type {Options}
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisOptions: Options;
  /**
   * This output will be emitted when the graph network is ready.
   * The output data is the graph network id.
   * @type {EventEmitter<string>}
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Output() ready: EventEmitter<string> = new EventEmitter<string>();

  private readonly container: any;
  private isReady: boolean;

  /**
   * It creates a new NgxVisNetworkEtsisiDirective
   * @param {ElementRef} elementRef The HTML element
   * @param {ngxVisNetworkEtsisiService} ngxVisNetworkEtsisiService The ngxVisNetworkEtsisiService
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  constructor(private elementRef: ElementRef, private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.container = this.elementRef.nativeElement;
    this.isReady = false;
  }
  /**
   * It generates a new graph when the data are available
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  ngOnInit() {
    if (!this.isReady && this.etsisiVis && this.etsisiVisNodes && this.etsisiVisEdges) {
      this.createNetwork();
    }
  }
  /**
   * It generates the graph
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  private createNetwork() {
    this.ngxVisNetworkEtsisiService.create(this.container, this.etsisiVis, this.etsisiVisNodes, this.etsisiVisEdges, this.etsisiVisOptions);
    this.isReady = true;
    this.ready.emit(this.etsisiVis);
  }
  /**
   * It destroys the graph
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  ngOnDestroy() {
    this.isReady = false;
    this.ngxVisNetworkEtsisiService.destroy(this.etsisiVis);
  }
}
