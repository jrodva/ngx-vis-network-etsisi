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

import { EventEmitter, Injectable } from '@angular/core';
import {
  BoundingBox,
  ClusterOptions,
  Data,
  DataSet,
  Edge,
  EdgeOptions,
  FitOptions,
  IdType,
  MoveToOptions,
  Network,
  NetworkEvents,
  Node,
  NodeOptions,
  OpenClusterOptions,
  Options,
  Position
} from 'vis-network/standalone';

/**
 * This service allow CRUD operations for graph networks.
 * Also, it exposes all available events from Vis Network
 * @export
 * @class NgxVisNetworkEtsisiService
 */
@Injectable({
  providedIn: 'root'
})
export class NgxVisNetworkEtsisiService {
  /**
   * Fired when the user clicks the mouse or taps on a touchscreen device.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  click: EventEmitter<any> = new EventEmitter<any>();
  /**
   * 	Fired when the user double clicks the mouse or double taps on a touchscreen device.
   * 	Since a double click is in fact 2 clicks, 2 click events are fired, followed by a double click event.
   * 	If you do not want to use the click events if a double click event is fired,
   * 	just check the time between click events before processing them.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  doubleClick: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the user click on the canvas with the right mouse button.
   * The right mouse button does not select by default.
   * You can use the method getNodeAt to select the node if you want.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  oncontext: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the user clicks and holds the mouse or taps and holds on a touchscreen device.
   * A click event is also fired in this case.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  hold: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired after drawing on the canvas has been completed.
   * Can be used to draw on top of the network.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  release: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the selection has changed by user action.
   * This means a node or edge has been selected, added to the selection or deselected.
   * All select events are only triggered on click and hold.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  select: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when a node has been selected by the user.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  selectNode: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when an edge has been selected by the user.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  selectEdge: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when a node (or nodes) has (or have) been deselected by the user.
   * The previous selection is the list of nodes and edges that were selected before the last user event.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  deselectNode: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when an edge (or edges) has (or have) been deselected by the user.
   * The previous selection is the list of nodes and edges that were selected before the last user event.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  deselectEdge: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when starting a drag.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  dragStart: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when dragging node(s) or the view.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  dragging: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the drag has finished.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  dragEnd: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired if the option interaction:{hover:true} is enabled and the mouse hovers over a node.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  hoverNode: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired if the option interaction:{hover:true} is enabled and the mouse moved away from a node it was hovering over before.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  blurNode: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired if the option interaction:{hover:true} is enabled and the mouse hovers over an edge.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  hoverEdge: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired if the option interaction:{hover:true} is enabled and the mouse moved away from an edge it was hovering over before.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  blurEdge: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the popup (tooltip) is shown.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  showPopup: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the popup (tooltip) is hidden.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  hidePopup: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when stabilization starts.
   * This is also the case when you drag a node and the physics simulation restarts to stabilize again.
   * Stabilization does not necessarily imply 'without showing'.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  startStabilizing: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when a multiple of the updateInterval number of iterations is reached.
   * This only occurs in the 'hidden' stabilization.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  stabilizationProgress: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the 'hidden' stabilization finishes.
   * This does not necessarily mean the network is stabilized;
   * it could also mean that the amount of iterations defined in the options has been reached.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  stabilizationIterationsDone: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the network has stabilized or when the stopSimulation() has been called.
   * The amount of iterations it took could be used to tweak the maximum amount of iterations needed to stabilize the network.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  stabilized: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the user zooms in or out.
   * The properties tell you which direction the zoom is in.
   * The scale is a number greater than 0, which is the same that you get with network.getScale().
   * When fired by clicking the zoom in or zoom out navigation buttons, the pointer property of the object passed will be null.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  zoom: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when the size of the canvas has been resized, either by a redraw call when the container div has changed in size,
   * a setSize() call with new values or a setOptions() with new width and/or height values.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  resize: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired before the redrawing begins. The simulation step has completed at this point.
   * Can be used to move custom elements before starting drawing the new frame.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  initRedraw: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when an animation is finished.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  animationFinished: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired when a user changes any option in the configurator.
   * The options object can be used with the setOptions method or stringified using JSON.stringify().
   * You do not have to manually put the options into the network: this is done automatically.
   * You can use the event to store user options in the database.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  configChange: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired after the Canvas has been cleared, scaled and translated to
   * the viewing position but before all edges and nodes are drawn.
   * Can be used to draw behind the network.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  beforeDrawing: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Fired after drawing on the canvas has been completed.
   * Can be used to draw on top of the network.
   * @type {EventEmitter<any>}
   * @memberOf NgxVisNetworkEtsisiService
   */
  afterDrawing: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Aux structure to store all graphs network data.
   * @memberOf NgxVisNetworkEtsisiService
   */
  private auxGraphs: { [id: string]: { network: Network; nodes: DataSet<Node>; edges: DataSet<Edge>; options?: Options } };
  /**
   * Structure to store the seed graphs network data.
   * @memberOf NgxVisNetworkEtsisiService
   */
  private seedGraphs: { [id: string]: { nodes: Node[]; edges: Edge[]; options?: Options } };

  constructor() {
    this.auxGraphs = {};
    this.seedGraphs = {};
  }
  /**
   * It creates a new graph network.
   * @param { HTMLElement } container is the html element where the graph will be added.
   * @param { string } id is the graph network id.
   * @param { DataSet<Node> } nodes to generate the graph network.
   * @param { DataSet<Edge> } edges to generate the graph network.
   * @param { Options } options to generate the graph network.
   * @throws {Error} Thrown when the graph network has already been rendered.
   * @memberOf NgxVisNetworkEtsisiService
   */
  create(container: HTMLElement, id: string, nodes: DataSet<Node>, edges: DataSet<Edge>, options?: Options) {
    if (this.auxGraphs[id]) {
      throw new Error(`Graph ${id} exists`);
    }
    this.auxGraphs[id] = {
      network: new Network(container, { nodes: nodes, edges: edges }, options),
      nodes: nodes,
      edges: edges,
      options: options
    };
    this.seedGraphs[id] = { nodes: nodes.getDataSet().get(), edges: edges.getDataSet().get(), options: options };
  }
  /**
   * It gets the number of nodes for a graph with a concrete id.
   * @param { string } id is the graph network id.
   * @returns { number }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getNodesCount(id: string): number {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].nodes.length;
    }
    return 0;
  }
  /**
   * It returns if the graph exists.
   * @param { string } id is the graph network id.
   * @returns { boolean }
   * @memberOf NgxVisNetworkEtsisiService
   */
  isAnExistingGraphNetwork(id: string): boolean {
    return !!this.auxGraphs[id];
  }
  /**
   * Adds a node in a graph network.
   * @param { string } id
   * @param { Node | Node[] } data is the node info.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  addNode(id: string, data: Node | Node[]) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].nodes.add(data);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Updates a node in a graph network.
   * @param { string } id is the graph network id.
   * @param { Node | Node[] } data is the node info.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  updateNode(id: string, data: Node | Node[]) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].nodes.update(data);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Removes a node in a graph network.
   * @param { string } id is the graph network id.
   * @param { number } nodeId is the node id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  removeNode(id: string, nodeId: number) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].nodes.remove(nodeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Adds an edge in a graph network.
   * @param { string } id is the graph network id.
   * @param { Edge | Edge[] } data is the edge info.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  addEdge(id: string, data: Edge | Edge[]) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].edges.add(data);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Removes an edge in a graph network.
   * @param { string } id is the graph network id.
   * @param { number } edgeId is the edge id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  removeEdge(id: string, edgeId: number) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].edges.remove(edgeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Updates a background node in a graph network for only one node.
   * @param { string } id is the graph network id.
   * @param { Node } nodeData is the data to modify a background node.
   * @memberOf NgxVisNetworkEtsisiService
   */
  setBackgroundNode(id: string, nodeData: Node) {
    this.updateNode(id, nodeData);
  }
  /**
   * Gets the node positions using an array of nodes id for a graph node.
   * @param { string } id is the graph network id.
   * @param { IdType[] } nodeIds is the array of nodes id.
   * @returns { [nodeId: string]: Position }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getNodePositions(id: string, nodeIds: IdType[]): { [nodeId: string]: Position } {
    return this.auxGraphs[id].network.getPositions(nodeIds);
  }
  /**
   * It comes back to the seed state for a graph network.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  resetGraph(id: string) {
    if (this.auxGraphs[id]) {
      this.updateNode(id, this.seedGraphs[id].nodes);
      this.updateEdge(id, this.seedGraphs[id].edges);
      this.setOptions(id, this.seedGraphs[id].options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * If you like the layout of your network and would like it to start in the same way next time, ask for the seed using this method
   * and put it in the layout.randomSeed option.
   * @param { string } id is the graph network id.
   * @returns { number }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getSeed(id: string): number {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getSeed();
    }
    return -1;
  }
  /**
   * Zooms out so all nodes fit on the canvas.
   * @param { string } id is the graph network id.
   * @param { FitOptions } options to fit the graph network.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  fit(id: string, options?: FitOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.fit(options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Redraw a graph network.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  redraw(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.redraw();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Returns the current scale of the network. 1.0 is comparable to 100%, 0 is zoomed out infinitely.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getScale(id: string): number {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getScale();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * This function converts canvas coordinates to coordinates on the DOM.
   * Input and output are in the form of {x:Number,y:Number}.
   * The DOM values are relative to the network container.
   * @param { string } id is the graph network id.
   * @param { Position } position is the Canvas coordinates.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  canvasToDom(id: string, position: Position): Position {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.canvasToDOM(position);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * This function converts DOM coordinates to coordinates on the canvas.
   * Input and output are in the form of {x:Number,y:Number}.
   * The DOM values are relative to the network container.
   * @param { string } id is the graph network id.
   * @param { Position } position is the Canvas coordinates.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  domToCanvas(id: string, position: Position): Position {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.DOMtoCanvas(position);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Sets an event listener. Depending on the type of event you get different parameters for the callback function.
   * Look at the event section of the documentation for more information.
   * @param { string } id is the graph network id.
   * @param { NetworkEvents } eventName is the event name that we want to listen.
   * @param { boolean } preventDefault is to stop the default behaviour of the event.
   * @memberOf NgxVisNetworkEtsisiService
   */
  on(id: string, eventName: NetworkEvents, preventDefault?: boolean): boolean {
    if (this.auxGraphs[id]) {
      const that = this;
      this.auxGraphs[id].network.on(eventName, params => {
        const emitter = that[eventName] as EventEmitter<any>;
        if (emitter) {
          emitter.emit(params ? [id].concat(params) : id);
        }
        if (preventDefault && params.event) {
          params.event.preventDefault();
        }
      });
      return true;
    }
    return false;
  }
  /**
   * Removes an event listener. The function you supply has to be the exact same as the one you used in the on function.
   * If no function is supplied, all listeners will be removed.
   * Look at the event section of the documentation for more information.
   * @param { string } id is the graph network id.
   * @param { NetworkEvents } eventName is the event name that we want to listen.
   * @memberOf NgxVisNetworkEtsisiService
   */
  off(id: string, eventName: NetworkEvents) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.off(eventName);
    }
  }
  /**
   * Set an event listener only once. After it has taken place, the event listener will be removed.
   * Depending on the type of event you get different parameters for the callback function.
   * Look at the event section of the documentation for more information.
   * @param { string } id is the graph network id.
   * @param { NetworkEvents } eventName is the event name that we want to listen.
   * @memberOf NgxVisNetworkEtsisiService
   */
  once(id: string, eventName: NetworkEvents): boolean {
    if (this.auxGraphs[id]) {
      const that = this;
      this.auxGraphs[id].network.on(eventName, params => {
        const emitter = that[eventName] as EventEmitter<any>;
        if (emitter) {
          emitter.emit(params ? [id].concat(params) : id);
          this.off(id, eventName);
        }
      });
      return true;
    }
    return false;
  }
  /**
   * Removes the network from the DOM and remove all Hammer bindings and references.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  destroy(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.destroy();
      delete this.auxGraphs[id];
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Updates an edge in a graph network.
   * @param { string } id is the graph network id.
   * @param { Edge | Edge[] } data is the edge info.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  updateEdge(id: string, data: Edge | Edge[]) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].edges.update(data);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Sets the options in a graph network.
   * @param { string } id is the graph network id.
   * @param { Options } options is the configuration to modify a graph network.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  setOptions(id: string, options: Options) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.setOptions(options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Sets the data in a graph network.
   * @param { string } id is the graph network id.
   * @param { Data } data is the data to modify a graph network.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  setData(id: string, data: Data) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.setData(data);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Selects the nodes of the parameter nodeIds in a graph network
   * @param { string } id is the graph network id.
   * @param { IdType[] } nodeIds is an array of node ids.
   * @param { boolean } highlightEdges is a flag to indicate if it highlights the edges.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  selectNodes(id: string, nodeIds: IdType[], highlightEdges?: boolean) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.selectNodes(nodeIds, highlightEdges);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Starts the physic simulation for a graph network
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  startSimulation(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.startSimulation();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Stops the physic simulation for a graph network
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  stopSimulation(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.stopSimulation();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Moves a graph network using the moveToOptions
   * @param { string } id is the graph network id.
   * @param { MoveToOptions } moveToOptions is the options to move the graph.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  moveTo(id: string, moveToOptions: MoveToOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.moveTo(moveToOptions);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets the connected edges using a node id for a graph network.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is the id of the node to obtain its connected edges.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getConnectedEdges(id: string, nodeId: IdType) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.getConnectedEdges(nodeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets the connected nodes using a node/edge id for a graph network.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeOrEdgeId is the id of the node/edge to obtain its connected nodes.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getConnectedNodes(id: string, nodeOrEdgeId: IdType) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.getConnectedNodes(nodeOrEdgeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets the selected nodes for a graph network.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @returns { IdType[] }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getSelectedNodes(id: string): IdType[] {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getSelectedNodes();
    }
    return [];
  }
  /**
   * Gets the selected edges for a graph network.
   * @param { string } id is the graph network id.
   * @returns { IdType[] }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getSelectedEdges(id: string): IdType[] {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getSelectedEdges();
    }
    return [];
  }
  /**
   * Gets a node id for a concrete position in a graph network
   * @param { string } id is the graph network id.
   * @param { Position } position is the position for obtain a node id in a graph network.
   * @returns { IdType }
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getNodeAt(id: string, position: Position): IdType {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getNodeAt(position);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets an edge id for a concrete position in a graph network
   * @param { string } id is the graph network id.
   * @param { Position } position is the position for obtain a edge id in a graph network.
   * @returns { IdType }
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getEdgeAt(id: string, position: Position): IdType {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getEdgeAt(position);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Selects different elements for a graph network.
   * @param { string } id is the graph network id.
   * @param { nodes: IdType[]; edges: IdType[] } selection is a set of nodes and/or edges.
   * @param { unselectAll?: boolean; highlightEdges?: boolean } options is the configuration for the selection.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  setSelection(
    id: string,
    selection: { nodes: IdType[]; edges: IdType[] },
    options: { unselectAll?: boolean; highlightEdges?: boolean } = {}
  ) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.setSelection(selection, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets selected elements for a graph network.
   * @param { string } id is the graph network id.
   * @returns { nodes: IdType[]; edges: IdType[] }
   */
  getSelection(id: string): { nodes: IdType[]; edges: IdType[] } {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getSelection();
    }
    return undefined;
  }
  /**
   * Unselects all the selected elements for a graph network.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  unselectAll(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.unselectAll();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Deletes the selected elements.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  deleteSelected(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.deleteSelected();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Gets a bounding box for the node with nodeId including label.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is the node id.
   * @returns { BoundingBox }
   * @memberOf NgxVisNetworkEtsisiService
   */
  getBoundingBox(id: string, nodeId: IdType): BoundingBox {
    return this.auxGraphs[id].network.getBoundingBox(nodeId);
  }
  /**
   * Stores positions for a graph node.
   * When using the vis.DataSet to load your nodes into the network,
   * this method will put the X and Y positions of all nodes into that dataset.
   * If you're loading your nodes from a database and have this dynamically coupled with the DataSet,
   * you can use this to stabilize your network once, then save the positions in that database
   * through the DataSet so the next time you load the nodes, stabilization will be near instantaneous.
   * If the nodes are still moving and you're using dynamic smooth edges (which is on by default),
   * you can use the option stabilization.onlyDynamicEdges in the physics module to improve initialization time.
   * This method does not support clustering.
   * At the moment it is not possible to cache positions when using clusters since
   * they cannot be correctly initialized from just the positions.
   * @param { string } id is the graph network id.
   * @memberOf NgxVisNetworkEtsisiService
   */
  storePositions(id: string) {
    this.auxGraphs[id].network.storePositions();
  }
  /**
   * Go into addNode mode. Having edit mode or manipulation enabled is not required. To get out of this mode, call disableEditMode().
   * The callback functions defined in handlerFunctions still apply.
   * To use these methods without having the manipulation GUI, make sure you set enabled to false.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  addNodeMode(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.addNodeMode();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Programmatically enable the edit mode. Similar effect to pressing the edit button.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  enableEditMode(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.enableEditMode();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Go into addEdge mode. The explanation from addNodeMode applies here as well.
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  addEdgeMode(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.addEdgeMode();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Programmatically disable the edit mode.
   * Similar effect to pressing the close icon (small cross in the corner of the toolbar).
   * @param { string } id is the graph network id.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  disableEditMode(id: string) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.disableEditMode();
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Updates a clustered node.
   * @param { string } id is the graph network id.
   * @param { IdType }clusteredNodeId is a clustered node id.
   * @param { NodeOptions } options to update the cluster node.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  updateClusteredNode(id: string, clusteredNodeId: IdType, options?: NodeOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.updateClusteredNode(clusteredNodeId, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Returns an array of all nodeIds of the nodes that would be released if you open the cluster.
   * @param { string } id is the graph network id.
   * @param { IdType } clusterNodeId is a cluster node id.
   * @returns { IdType[] }
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getNodesInCluster(id: string, clusterNodeId: IdType): IdType[] {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getNodesInCluster(clusterNodeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Opens the cluster, releases the contained nodes and edges, removing the cluster node and cluster edges.
   * The options object is optional and currently supports one option,
   * releaseFunction, which is a function that can be used to manually position the nodes after the cluster is opened.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is a node id.
   * @param { OpenClusterOptions } options is the open cluster options.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  openCluster(id: string, nodeId: IdType, options?: OpenClusterOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.openCluster(nodeId, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Returns true if the node whose ID has been supplied is a cluster.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is a node id.
   * @returns { boolean }
   * @memberOf NgxVisNetworkEtsisiService
   */
  isCluster(id: string, nodeId: IdType): boolean {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.isCluster(nodeId);
    }
    return false;
  }
  /**
   * Gets clustered edges.
   * Similar to findNode in that it returns all the edge ids that were created from the provided edge during clustering.
   * @param { string } id is the graph network id.
   * @param { IdType } baseEdgeId is the initial edge.
   * @returns { IdType[] }
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getClusteredEdges(id: string, baseEdgeId: IdType): IdType[] {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getClusteredEdges(baseEdgeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Makes a cluster for a graph network.
   * @param { string } id is the graph network id.
   * @param { ClusterOptions } options is the cluster options.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  cluster(id: string, options?: ClusterOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.cluster(options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * This method looks at the provided node and makes a cluster of it and all it's connected nodes.
   * The behaviour can be customized by proving the options object.
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is the node id.
   * @param { ClusterOptions } options is the cluster options.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  clusterByConnection(id: string, nodeId: IdType, options?: ClusterOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.clusterByConnection(nodeId as string, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * This method checks all nodes in the network and those with a equal or higher amount of edges than specified with the hubsize qualify.
   * If a hubsize is not defined, the hubsize will be determined as the average value plus two standard deviations.
   * For all qualifying nodes, clusterByConnection is performed on each of them.
   * The options object is described for clusterByConnection and does the same here.
   * @param { string } id is the graph network id.
   * @param { number } hubsize is the size of a hub.
   * @param { ClusterOptions } options is the cluster options.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  clusterByHubSize(id: string, hubsize?: number, options?: ClusterOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.clusterByHubsize(hubsize, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * This method will cluster all nodes with 1 edge with their respective connected node.
   * @param { string } id is the graph network id.
   * @param { ClusterOptions } options is the cluster options.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  clusterOutliers(id: string, options?: ClusterOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.clusterOutliers(options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * When a clusteredEdgeId is available, this method will return the original
   * baseEdgeId provided in data.edges ie.
   * After clustering the 'SelectEdge' event is fired but provides only the clustered edge.
   * This method can then be used to return the baseEdgeId.
   * @param { string } id is the graph network id.
   * @param { IdType } clusteredEdgeId is the id of a clustered edge in a graph network.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  getBaseEdge(id: string, clusteredEdgeId: IdType): IdType {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.getBaseEdge(clusteredEdgeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Visible edges between clustered nodes are not the same edge as the ones provided in data.edges passed on network creation
   * With each layer of clustering, copies of the edges between clusters are created and the previous edges are hidden, until the cluster
   * is opened.
   * This method takes an edgeId (ie. a base edgeId from data.edges) and applies the options to it and any edges that were created from
   * it while clustering.
   * Example: network.clustering.updateEdge(originalEdge.id, {color : '#aa0000'});
   * This would turn the base edge and any subsequent edges red, so when opening clusters the edges will all be the same color.
   * @param { string } id is the graph network id.
   * @param { IdType } startEdgeId is the initial edge.
   * @param { EdgeOptions } options is the configuration for update the edges that are clustered.
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  updateClusteredEdges(id: string, startEdgeId: IdType, options?: EdgeOptions) {
    if (this.auxGraphs[id]) {
      this.auxGraphs[id].network.updateEdge(startEdgeId, options);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
  /**
   * Nodes can be in clusters.
   * Clusters can also be in clusters.
   * This function returns an array of nodeIds showing where the node is.
   * Example:
   * cluster 'A' contains cluster 'B', cluster 'B' contains cluster 'C',
   * cluster 'C' contains node 'fred'.
   * network.clustering.findNode('fred') will return ['A','B','C','fred'].
   * @param { string } id is the graph network id.
   * @param { IdType } nodeId is the node id.
   * @returns { IdType[] }
   * @throws {Error} Thrown when the graph network doesn't exist.
   * @memberOf NgxVisNetworkEtsisiService
   */
  findNode(id: string, nodeId: IdType): IdType[] {
    if (this.auxGraphs[id]) {
      return this.auxGraphs[id].network.findNode(nodeId);
    } else {
      throw new Error(`Graph ${id} doesn't exist.`);
    }
  }
}
