# NgxVisNetworkEtsisi

## Description
![NgxNetworkVis](https://jrodva.github.io/ngx-vis-network-etsisi/assets/img/angularplusvis.png)

Final Degree project - Implementation of Angular library using Vis Network.

The main goal of this project is get easier the use of Vis Network including an abstraction layer to different edition methods in an Angular project.

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Apache](https://img.shields.io/badge/license-Apache-green.svg)](http://www.apache.org/licenses/)

## Table of contents
  - [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Building](#building)
    - [Show case](#show-case)
  - [Overall features](#overall-features)
  - [Linting](#linting)
  - [Running unit tests](#running-unit-tests)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

### Requirements

It's necessary to have installed at least Node 10.

Also, we need to install those dependencies:
- [Vis Data](https://www.npmjs.com/package/vis-data)
- [Vis Network](https://www.npmjs.com/package/vis-network)
- [Vis Util](https://www.npmjs.com/package/vis-util)

### Installation
Just run `npm -i ngx-vis-network-etsisi`

### Configuration
You need to import the module NgxVisNetworkEtsisiModule.
```
import { NgxVisNetworkEtsisiModule } from 'ngx-vis-network-etsisi';
 
 @NgModule({
   ...
   imports: [NgxVisNetworkEtsisiModule, ...],
   ... 
 })
  ...
```
To use inside a component:
- You have to add this directive.
```
<div class="graph-network"
     [etsisiVis]="id"
     [etsisiVisNodes]="nodes"
     [etsisiVisEdges]="edges"
     [etsisiVisOptions]="options"
     (ready)="isGraphNetworkReady()">
</div>
```
- You have to add this import statement.
```
import { DataSet, Edge, NgxVisNetworkEtsisiService, Node, Options } from 'ngx-vis-network-etsisi';
```

## Overall features
We have two important elements in this project:
- ngx-vis-network-etsisi

For this element we have created:

  - A module.
  - A directive that is exposed for our service.
```
    @Input() etsisiVis: string; 
    @Input() etsisiVisNodes: DataSet<Node>; 
    @Input() etsisiVisEdges: DataSet<Edge>; 
    @Input() etsisiVisOptions: Options; 
    @Output() ready: EventEmitter<string> = new EventEmitter<string>();
```
  - A service that is exposed for our module.
    
    We have included some new methods:
    - create(container: HTMLElement, id: string, nodes: DataSet<Node>, edges: DataSet<Edge>, options?: Options)
      
      It creates a graph with the chosen configuration.

    - getNodesCount(id: string): number
      
      It gets the number of nodes for a graph with a concrete id.
      
    - getNodes(id: string): DataSet<Node> | null
      
      It gets the nodes for a graph with a concrete id.
      
    - getEdges(id: string): DataSet<Edge> | null
      
      It gets the edges for a graph with a concrete id.
      
    - isAnExistingGraphNetwork(id: string): boolean
      
      It returns if a graph with a concrete id exists.
      
    - addNode(id: string, data: Node | Node[])
      
      It adds a node in a concrete graph network.
    
    - updateNode(id: string, data: Node | Node[])
      
      It updates a node in a graph network.
    
    - removeNode(id: string, nodeId: number)
      
      It removes a concrete node in a graph network.
    
    - addEdge(id: string, data: Edge | Edge[])
      
      It adds a concrete edge in a graph network.
    
    - removeEdge(id: string, edgeId: number)
      
      It removes a concrete edge in a graph network.
    
    - setBackgroundNode(id: string, nodeId: string | number, backgroundColor: string)
      
      It updates a background node in a graph network for only one node.
    
    - resetGraph(id: string)
      
      It comes back to the initial state for a graph network.

- ngx-vis-network-etsisi-show-case

  For this element we have created a playroom with 3 main sections:
  - Basic
    
    In this section we have options to:
    - Show/hide labels.
    - Show/hide icons.
    - Show/hide links.
    - Show/hide navigation and interaction buttons.
    - Reset.
    
  - Dynamic
  
    In this section we have options to:
      - Add nodes.
      - Add links.
      - Select elements.
      - Delete elements.
      - Reset.
      
  - Style
    In this section we have options to:
      - Change nodes color.
      - Change borders color.
      - Change links color.
      - Reset.

## Building
We have different building options.

### Full building
Just run `npm run build`

### Full building on dev mode
Just run `npm run build:dev`

### Build library
Just run `npm run build:lib`

### Build show case
Just run `npm run build:showcase`

### Build library on dev mode
Just run `npm run build:lib:dev`

### Build show case on dev mode
Just run `npm run build:showcase:dev`

### Show case
You can try our show case [here](https://jrodva.github.io/ngx-vis-network-etsisi/)

## Linting
- Run `npm run lint` to check all tslint rules.
- Run `npm run lint:fix` to fix the related errors with all tslint rules.
- Run `npm run style-lint` to check all style lint rules.
- Run `npm run style-lint:fix` to fix the related errors with all stylelint rules.

## Running unit tests
Run `npm run test`

## Documentation
Run `npm run compodoc` to generate the project documentation.

Also, you can check our documentation [here](https://github.com/jrodva/ngx-vis-network-etsisi/tree/master/documentation)

## Contributing
Please read [contributing.md](https://github.com/jrodva/ngx-vis-network-etsisi/blob/master/contributing.md) to contribute to our project.

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
