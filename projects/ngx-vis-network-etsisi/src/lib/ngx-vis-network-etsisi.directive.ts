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
 * @description Using this directive the graph will be dynamically added inside the chosen container.
 * @export NgxVisNetworkEtsisiDirective
 */
@Directive({
  selector: '[etsisiVis]'
})
export class NgxVisNetworkEtsisiDirective implements OnInit, OnDestroy {
  /**
   * @description Graph network id.
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVis: string;
  /**
   * @description Graph network nodes.
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisNodes: DataSet<Node>;
  /**
   * @description Graph network edges.
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisEdges: DataSet<Edge>;
  /**
   * @description Graph network id.
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Input() etsisiVisOptions: Options;
  /**
   * @description This output will be emitted when the graph network is ready.
   * The output data is the graph network id.
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  @Output() ready: EventEmitter<string> = new EventEmitter<string>();

  private readonly container: any;
  private isReady: boolean;

  /**
   * @description It creates a new NgxVisNetworkEtsisiDirective
   * @param elementRef The HTML element
   * @param ngxVisNetworkEtsisiService The ngxVisNetworkEtsisiService
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  constructor(private elementRef: ElementRef, private ngxVisNetworkEtsisiService: NgxVisNetworkEtsisiService) {
    this.container = this.elementRef.nativeElement;
    this.isReady = false;
  }
  /**
   * @description It generates a new graph when the data are available
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  ngOnInit() {
    if (!this.isReady && this.etsisiVis && this.etsisiVisNodes && this.etsisiVisEdges) {
      this.createNetwork();
    }
  }
  /**
   * @description It generates the graph
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  private createNetwork() {
    this.ngxVisNetworkEtsisiService.create(this.container, this.etsisiVis, this.etsisiVisNodes, this.etsisiVisEdges, this.etsisiVisOptions);
    this.isReady = true;
    this.ready.emit(this.etsisiVis);
  }
  /**
   * @description It destroys the graph
   * @memberOf NgxVisNetworkEtsisiDirective
   */
  ngOnDestroy() {
    this.isReady = false;
    this.ngxVisNetworkEtsisiService.destroy(this.etsisiVis);
  }
}
