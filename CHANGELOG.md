# Changelog

## v1.0.4
 - We have changed the show case language.
 - We are updating the readme document to show it correctly on npmjs.

## v1.0.3

Overall:

At this repository, we have 2 important projects:

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
