import Grid from './grid';
import Menu from './menu';
import Minimap from './minimap';
import Bundling from './bundling';
import Fisheye from './fisheye';
import ToolBar from './toolBar';
import Tooltip from './tooltip';
import TimeBar from './timeBar';
import ImageMinimap from './imageMinimap';
import PluginBase, { Plugin } from './base'


export default {
  Menu,
  Grid,
  Minimap,
  Bundling,
  ToolBar,
  Tooltip,
  Fisheye,
  TimeBar,
  ImageMinimap,
  PluginBase,
  Plugin,
  registerPlugin: Plugin.registerPlugin,
};
