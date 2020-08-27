import { ShapeAttrs } from '@antv/g-base';
import Base, { IPluginBaseConfig } from '../base';
import { deepMix, each, find, get, head, isBoolean, last } from '@antv/util';
import Legend from '@antv/component';
import { Continuous, Category } from '@antv/component/lib/legend';
import { ContinueLegendCfg as ContinueLegendCfgBase } from '@antv/component/lib/types'
import GCanvas from '@antv/g-canvas/lib/canvas';
/**
 * 图例项配置
**/
interface ContinueLegendCfg extends ContinueLegendCfgBase {
  colors: any[],
  nodeField?: 'value',
  onFiltered?: any
}

export default class ContinuousLegend extends Base {
  public getDefaultCfgs(): ContinueLegendCfg {
    return {
      id: 'a',
      x: 10,
      y: 10,
      min: Infinity,
      max: -Infinity,
      rail: {
        type: 'size',
        size: 10,
      },
      defaultLength: 100,
      track: {},
      label: {},
      handler: {},
      container: null,
      value: [],
      step: 10,
      updateAutoRender: true,
      slidable: true,
      colors: ['#ffffff', '#1890ff'],
      selectedState: 'selected',
      onFiltered: () => { },
    }
  }

  // 获取graph中的数据
  private initLegendData() {
    const nodeField = this._cfgs.nodeField;
    // console.log(nodeField, this.get('graph').cfg.data.nodes)
    let min = this._cfgs.min;
    let max = this._cfgs.max;
    for (let node of this.get('graph').cfg.data.nodes) {
      min = Math.min(min, node[nodeField])
      max = Math.max(max, node[nodeField])
    }
    this.set('min', min)
    this.set('max', max)
    this.set('value', [min, max]);
  }

  /**
   * 创建并渲染连续图例
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  public render(container) {
    const graph = this.get('graph')
    this.set('container', container)
    // init legend data
    this.initLegendData()
    const legend = new Continuous(this._cfgs);
    legend.init()
    legend.render();
    this.set('legend', legend)
    legend.on('valuechanged', () => {
      const selectedNodes = this.getFilteredNodes()
      const selectedEdges = this.getFilteredEdges()
      if (this.get('onFiltered')) {
        this.get('onFiltered')(selectedNodes, selectedEdges);
      }
      console.log(selectedNodes)
      graph.emit('nodeselectchange', {
        selectedItems: {
          nodes: selectedNodes,
          edges: selectedEdges,
        },
        select: true,
      });
    })

  }
  public getFilteredNodes() {
    const graph = this.get('graph');
    const state = this.get('selectedState')
    const legend = this.get('legend')
    const selectedNodes = [];
    for (let node of graph.getNodes()) {
      if (node.getModel()[this._cfgs.nodeField] >= legend.getValue()[0] && node.getModel()[this._cfgs.nodeField] <= legend.getValue()[1]) {
        selectedNodes.push(node);
        graph.setItemState(node, state, true);
      }
    };
    return selectedNodes
  }
  public getFilteredEdges() {
    const graph = this.get('graph');
    const selectedEdges = []
    for (let edge of graph.cfg.data.edges) {

    }
    return selectedEdges
  }
  public init() {
    const graph = this.get('graph')

    // init canvas 
    const legendCanvas = new GCanvas({
      container: graph.get('container'),
      width: this._cfgs.defaultLength * 2,
      height: this._cfgs.rail.size * 3,
    })
    legendCanvas.set('localRefresh', false)

    const renderLegend = () => {
      this.render(legendCanvas)
      graph.off('afterrender', renderLegend)
    }
    graph.on('afterrender', renderLegend)
  }
}
