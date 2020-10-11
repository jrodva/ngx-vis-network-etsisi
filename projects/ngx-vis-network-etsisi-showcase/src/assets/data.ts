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
import { environment } from '../environments/environment';

const commonNode = {
  borderWidth: 3,
  imagePadding: 30,
  font: {
    color: '#fff',
    size: 20,
    strokeWidth: 1,
    strokeColor: '#000'
  },
  shape: 'circularImage',
  size: 58
};

const nodeColor = {
  border: '#FFF',
  background: '#1B8F1D',
  highlight: {
    border: '#5800FF',
    background: '#1B8F1D'
  }
};

const nodeData = {
  borderWidthSelected: commonNode.borderWidth,
  color: nodeColor
};

const commonEdge = {
  color: { color: 'rgba(0,0,255,0.38)' },
  width: 5,
  arrows: {
    middle: {
      enabled: true,
      imageHeight: 24,
      imageWidth: 24,
      scaleFactor: 1,
      src: '/assets/img/link.svg',
      type: 'image'
    }
  },
  font: {
    color: '#000',
    align: 'middle'
  }
};

const androidImage = `${environment.assetsDir}/assets/img/android-black-24dp.svg`;
const appBlockingImage = `${environment.assetsDir}/assets/img/app_blocking-black-24dp.svg`;
const phoneImage = `${environment.assetsDir}/assets/img/phone-black-24dp.svg`;
const backupImage = `${environment.assetsDir}/assets/img/backup-black-24dp.svg`;
const codeImage = `${environment.assetsDir}/assets/img/code-black-24dp.svg`;
const developerImage = `${environment.assetsDir}/assets/img/developer_mode-24px.svg`;
const micImage = `${environment.assetsDir}/assets/img/mic-black-24dp.svg`;
const recordImage = `${environment.assetsDir}/assets/img/record_voice_over-black-24dp.svg`;

export const graphNetworkNodes = [
  {
    id: 5,
    label: 'Ingeniero',
    level: 0,
    ...commonNode,
    ...nodeData,
    image: developerImage
  },
  {
    id: 4,
    label: 'Código',
    level: 2,
    ...commonNode,
    ...nodeData,
    image: codeImage
  },
  {
    id: 0,
    label: 'Android',
    level: 4,
    ...commonNode,
    image: androidImage,
    borderWidthSelected: commonNode.borderWidth,
    color: nodeColor
  },
  {
    id: 1,
    label: 'Bloqueo',
    level: 6,
    ...commonNode,
    ...nodeData,
    image: appBlockingImage
  },
  {
    id: 2,
    label: 'Teléfono',
    level: 6,
    ...commonNode,
    ...nodeData,
    image: phoneImage
  },
  {
    id: 3,
    label: 'Copia',
    level: 6,
    ...commonNode,
    ...nodeData,
    image: backupImage
  },
  {
    id: 6,
    label: 'Micrófono',
    level: 6,
    ...commonNode,
    ...nodeData,
    image: micImage
  },
  {
    id: 7,
    label: 'Grabación',
    level: 6,
    ...commonNode,
    ...nodeData,
    image: recordImage
  }
];

export const graphNetworkEdges = [
  {
    id: 501,
    label: ' ',
    from: 0,
    to: 1,
    ...commonEdge
  },
  {
    id: 502,
    label: ' ',
    from: 0,
    to: 2,
    ...commonEdge
  },
  {
    id: 503,
    label: ' ',
    from: 0,
    to: 3,
    ...commonEdge
  },
  {
    id: 504,
    label: ' ',
    from: 4,
    to: 0,
    ...commonEdge
  },
  {
    id: 505,
    label: ' ',
    from: 5,
    to: 4,
    ...commonEdge
  },
  {
    id: 506,
    label: ' ',
    from: 0,
    to: 6,
    ...commonEdge
  },
  {
    id: 507,
    label: ' ',
    from: 0,
    to: 7,
    ...commonEdge
  }
];

const layout = {
  hierarchical: {
    enabled: true,
    levelSeparation: 150,
    nodeSpacing: 110,
    treeSpacing: 200,
    blockShifting: true,
    edgeMinimization: true,
    parentCentralization: true,
    direction: 'UD'
  }
};
const manipulation = {
  enabled: false,
  initiallyActive: false,
  addNode: true,
  addEdge: true,
  editEdge: true,
  deleteNode: true,
  deleteEdge: true
};
const interaction = {
  navigationButtons: true
};

export const graphNetworkOptions = { layout, manipulation, interaction };
