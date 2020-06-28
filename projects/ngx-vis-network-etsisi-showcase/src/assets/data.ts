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

const androidColor = {
  border: '#FFF',
  background: '#1B8F1D',
  highlight: {
    border: '#5800FF',
    background: '#1B8F1D'
  }
};

const appColor = {
  border: '#FFF',
  background: '#3E1B8F',
  highlight: {
    border: '#F00',
    background: '#3E1B8F'
  }
};

const appData = {
  borderWidthSelected: commonNode.borderWidth,
  color: appColor
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

const androidImage = '/assets/img/android-black-24dp.svg';
const appBlockingImage = '/assets/img/app_blocking-black-24dp.svg';
const phoneImage = '/assets/img/phone-black-24dp.svg';
const backupImage = '/assets/img/backup-black-24dp.svg';
const codeImage = '/assets/img/code-black-24dp.svg';
const developerImage = '/assets/img/developer_mode-24px.svg';
const micImage = '/assets/img/mic-black-24dp.svg';
const recordImage = '/assets/img/record_voice_over-black-24dp.svg';

export const graphNetworkNodes = [
  {
    id: 5,
    label: 'Developer',
    level: 0,
    ...commonNode,
    ...appData,
    image: developerImage
  },
  {
    id: 4,
    label: 'Code',
    level: 2,
    ...commonNode,
    ...appData,
    image: codeImage
  },
  {
    id: 0,
    label: 'Android',
    level: 4,
    ...commonNode,
    image: androidImage,
    borderWidthSelected: commonNode.borderWidth,
    color: androidColor
  },
  {
    id: 1,
    label: 'App Blocking',
    level: 6,
    ...commonNode,
    ...appData,
    image: appBlockingImage
  },
  {
    id: 2,
    label: 'Phone',
    level: 6,
    ...commonNode,
    ...appData,
    image: phoneImage
  },
  {
    id: 3,
    label: 'Backup',
    level: 6,
    ...commonNode,
    ...appData,
    image: backupImage
  },
  {
    id: 6,
    label: 'Mic',
    level: 6,
    ...commonNode,
    ...appData,
    image: micImage
  },
  {
    id: 7,
    label: 'Record',
    level: 6,
    ...commonNode,
    ...appData,
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
