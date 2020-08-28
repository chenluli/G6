import React, { useEffect } from 'react';
import G6, { Algorithm } from '../../../src';
const { degreeCentrality, closenessCentrality } = Algorithm;

const data = {
  nodes: [
    {
      id: 'A',
      label: 'A',
    },
    {
      id: 'B',
      label: 'B',
    },
    {
      id: 'C',
      label: 'C',
    },
    {
      id: 'D',
      label: 'D',
    },
    {
      id: 'E',
      label: 'E',
    },
    {
      id: 'F',
      label: 'F',
    },
    {
      id: 'G',
      label: 'G',
    },
    {
      id: 'H',
      label: 'H',
    },
    {
      id: 'I',
      label: 'I',
    },
    {
      id: 'J',
      label: 'J',
    },
    {
      id: 'K',
      label: 'K',
    }
  ],
  edges: [
    {
      source: 'D',
      target: 'A',
    },
    {
      source: 'D',
      target: 'B',
    },
    {
      source: 'B',
      target: 'C',
    },
    {
      source: 'C',
      target: 'B',
    },
    {
      source: 'F',
      target: 'B',
    },
    {
      source: 'F',
      target: 'E',
    },
    {
      source: 'E',
      target: 'F',
    },
    {
      source: 'E',
      target: 'D',
    },
    {
      source: 'E',
      target: 'B',
    },
    {
      source: 'K',
      target: 'E',
    },
    {
      source: 'J',
      target: 'E',
    },
    {
      source: 'I',
      target: 'E',
    },
    {
      source: 'H',
      target: 'E',
    },
    {
      source: 'G',
      target: 'E',
    },
    {
      source: 'G',
      target: 'B',
    },
    {
      source: 'H',
      target: 'B',
    },
    {
      source: 'I',
      target: 'B',
    },
  ],
};

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('calculate centrality for nodes', () => {
  const graph = new G6.Graph({
    container: 'container',
    width: 500,
    height: 500,
    modes: {
      default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
    },
    defaultEdge: {
      style: {
        endArrow: true,
      },
    },
    layout: {
      type: 'force',
      preventOverlap: true,
    }
  });

  it('calculat degree centrality', () => {
    graph.data(data);
    graph.render();

    const degree = degreeCentrality(graph, 'E');
    const inDegree = degreeCentrality(graph, 'E', 'in');
    const outDegree = degreeCentrality(graph, 'E', 'out');
    expect(degree).toEqual(0.9);
    expect(inDegree).toEqual(0.6);
    expect(outDegree).toEqual(0.3);
  })

  it('calculat closeness centrality', () => {
    const testData = {
      nodes: [
        { id: '1' },
        { id: '2' },
        { id: '3' }
      ],
      edges: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
      ]
    }
    graph.changeData(testData);

    const centrality1 = closenessCentrality(graph, '1');
    const centrality2 = closenessCentrality(graph, '2');
    const centrality3 = closenessCentrality(graph, '3');
    expect(centrality1.toFixed(2)).toEqual('0.67');
    expect(centrality2).toEqual(1);
    expect(centrality3.toFixed(2)).toEqual('0.67');
  })
});
