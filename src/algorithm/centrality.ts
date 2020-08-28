import { IGraph } from "../interface/graph"
import { INode } from '../interface/item'
import dijkstra from './dijkstra';
import Graph from '../../src/graph/graph';

// refer: https://en.wikipedia.org/wiki/Centrality; 
// https://networkx.github.io/documentation/stable/reference/algorithms/centrality.html

/**
 * 用节点度数衡量节点中心度，并进行了归一化消除图规模的影响
 * @param graph IGraph
 * @param node 节点实例或节点 ID
 * @param type 'in' \ 'out' \ 'total' 入度\出度\总度数，默认总度数
 */
export const degreeCentrality = (graph: IGraph, node: string | INode, type?: 'in' | 'out' | 'total') => {
  const nodesCount = graph.getNodes().length
  if (nodesCount <= 1) return 1
  const centrality = graph.getNodeDegree(node, type) as number / (nodesCount - 1)
  return centrality
}

/**
 * 用节点到其他节点的平均最短距离衡量节点中心度，即越中心的节点，到其他节点距离越近
 * @param graph IGraph
 * @param node 节点实例或节点 ID
 * @param type 'in' \ 'out' \ 'total' 入接近度（“整合力”）\出接近度（“辐射力”）\总接近度 
 */
export const closenessCentrality = (graph: IGraph, node: string | INode, type: 'in' | 'out' | 'total' = 'total') => {
  let nodeId = node as string;
  if (!(typeof node === "string")) {
    nodeId = node.get('id');
  }

  let pathLength;
  if (type === 'out') {
    pathLength = dijkstra(graph, nodeId, true).length
  } else if (type === 'in') {
    // 临时创建一个边反向的 graph
    const reverseEdges = graph.getEdges().map(edge => ({ source: edge.getTarget().get('id'), target: edge.getSource().get('id') }))
    const reverseGraph = new Graph({ container: '', width: 0, height: 0 })
    reverseGraph.data({ nodes: graph.getNodes().map(node => node.get('id')), edges: reverseEdges })
    pathLength = dijkstra(graph, nodeId, true).length
  } else {
    pathLength = dijkstra(graph, nodeId, false).length
  }
  console.log(pathLength)
  const totalLength = Object.values(pathLength).reduce((a: number, b: number) => a + b) as number;
  if (totalLength === 0) {
    return 0
  }
  const centrality = (graph.getNodes().length - 1) / totalLength
  return centrality
}
