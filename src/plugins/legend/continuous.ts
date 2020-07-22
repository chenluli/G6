import { ShapeAttrs } from '@antv/g-base';
import Base, { IPluginBaseConfig } from '../base';
import { deepMix, each, find, get, head, isBoolean, last } from '@antv/util';
import Legend from '@antv/component';
import { Continuous, Category } from '@antv/component/lib/legend';
import GCanvas from '@antv/g-canvas/lib/canvas';
/**
 * 图例项配置
 */
// export interface ContinuousLegendOps {

// }
export interface ContinuousLegendCfg {
  layout?: 'horizontal' | 'vertical'; // 布局方式
  /**
   * 图例标题配置，默认不展示。
   */
  title?: {
    spacing?: number;    // 标题同图例项的间距
    style?: ShapeAttrs;  // 文本样式配置项
    text?: string;
  }
  /** 图例的位置。 */
  position?:
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';
  /**
   * 选择范围的最小值。
   */
  min?: number;
  /**
   * 选择范围的最大值。
   */
  max?: number;
  /**
   * 选择的值。
   */
  value?: number[];
  /**
   * 选择范围的色块样式配置项。
   */
  track?: {
    style?: ShapeAttrs; // 选定范围的样式
  };
  /**
   * 图例滑轨（背景）的样式配置项。
   */
  rail?: {
    type?: string; // rail 的类型，color, size
    size?: number; // 滑轨的宽度
    defaultLength?: number; // 滑轨的默认长度，，当限制了 maxWidth,maxHeight 时，不会使用这个属性会自动计算长度
    style?: ShapeAttrs; // 滑轨的样式
  };
  /**
   * 文本的配置项。
   */
  label?: {
    // 文本同滑轨的对齐方式，有五种类型
    // rail ： 同滑轨对齐，在滑轨的两端
    // top, bottom: 图例水平布局时有效
    // left, right: 图例垂直布局时有效
    align?: string;
    spacing?: number; // 文本同滑轨的距离
    style?: ShapeAttrs; // 文本样式
  };
  /**
   * 滑块的配置项。
   */
  handler?: {
    size?: number; // 滑块的大小
    style?: ShapeAttrs; // 滑块的样式设置
  };
  /**
   * 滑块是否可以滑动。
   */
  slidable?: boolean;
  /** 图例 x 方向的偏移。 */
  offsetX?: number;
  /** 图例 y 方向的偏移。 */
  offsetY?: number;
}

export default class ContinuousLegend extends Base {
  public getDefaultCfgs(): ContinuousLegendCfg {
    return {
    }
  }


  // 使用
  private getContinuousLegendCfgs(attr, scale) {

    // const containMin = ;
    // const containMax = ;
    // const items = ticks.map((tick: Tick) => {
    //   const { value, tickValue } = tick;
    //   const attrValue = attr.mapping(scale.invert(value)).join('');

    //   return {
    //     value: tickValue,
    //     attrValue,
    //     color: attrValue,
    //     scaleValue: value,
    //   };
    // });

    // if (!containMin) {
    //   items.push({
    //     value: scale.min,
    //     attrValue: attr.mapping(scale.invert(0)).join(''),
    //     color: attr.mapping(scale.invert(0)).join(''),
    //     scaleValue: 0,
    //   });
    // }
    // if (!containMax) {
    //   items.push({
    //     value: scale.max,
    //     attrValue: attr.mapping(scale.invert(1)).join(''),
    //     color: attr.mapping(scale.invert(1)).join(''),
    //     scaleValue: 1,
    //   });
    // }

    // // 排序
    // items.sort((a: any, b: any) => a.value - b.value);

    // // 跟 attr 相关的配置
    // // size color 区别的配置
    // const attrLegendCfg = {
    //   min: head(items).value,
    //   max: last(items).value,
    //   colors: [],
    //   rail: {
    //     type: attr.type,
    //   },
    //   track: {},
    // };

    // if (attr.type === 'size') {
    //   attrLegendCfg.track = {
    //     style: {
    //       // size 的选中前景色，对于 color，则直接使用 color 标识
    //       fill: attr.type === 'size' ? this.view.getTheme().defaultColor : undefined,
    //     },
    //   };
    // }

    // if (attr.type === 'color') {
    //   attrLegendCfg.colors = items.map((item) => item.attrValue);
    // }

    // const container = this.container;
    // // if position is not set, use top as default
    // const direction = getDirection(legendOption);

    // const layout = getLegendLayout(direction);

    // let title = get(legendOption, 'title');
    // if (title) {
    //   title = deepMix(
    //     {
    //       text: getName(scale),
    //     },
    //     title
    //   );
    // }

    // // 基础配置，从当前数据中读到的配置
    // attrLegendCfg.container = container;
    // attrLegendCfg.layout = layout;
    // attrLegendCfg.title = title;
    // return deepMix(attrLegendCfg, this._cfgs);
  }

  /**
   * 创建并渲染连续图例
   * @param geometry
   * @param attr
   * @param scale
   * @param legendOption
   */
  public render(container) {
    // const attr = this.get('attr')
    // const scale = attr.getScale(attr.type);
    // const cfg = this.getContinuousLegendCfgs(attr, scale);


    const legend = new Continuous({
      id: 'a',
      container,
      x: 10,
      y: 10,
      min: 0,
      max: 1000,
      rail: {
        size: 10,
        // type: 'size'
      },
      // track: {
      //   style: {
      //     fill: 'lightblue'
      //   }
      // },
      updateAutoRender: true,
      localRefresh: false,
      slidable: true,
      colors: ['#ffffff', '#1890ff'],
      // colors: ['red']
    });
    legend.init()
    legend.render();
  }

  public init() {
    const graph = this.get('graph')
    // let container = this.get('graph').get('canvas');
    const container = new GCanvas({
      container: graph.get('container'),
      width: 200,
      height: 40,
    })
    container.set('localRefresh', false)
    const renderLegend = () => {
      // const container = graph.get('canvas').addGroup();
      this.render(container)
      graph.off('afterrender', renderLegend)
    }
    graph.on('afterrender', renderLegend)

  }
}
