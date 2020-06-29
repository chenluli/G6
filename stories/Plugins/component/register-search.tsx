import React, { useEffect } from 'react';
import G6, { Graph } from '../../../src';
import { IGraph } from '../../../src/interface/graph';
import createDom from '@antv/dom-util/lib/create-dom';
import modifyCSS from '@antv/dom-util/lib/modify-css';

const SearchBoxOps = {
    getDefaultCfgs() {
        return {
            container: null, // container of searchbox. default: the container of graph
            className: 'g6-analyzer-searchbox', // 指定 container css
        };
    },
    init() {
        // 生成searchbox
        const searchBox = document.createElement('div');
        searchBox.className = this.get('className');
        const inputBox = createDom(`<input type="text" placeholder="Input node id"></input>`)
        inputBox.addEventListener('keyup', this.onChange.bind(this))
        const searchButton = createDom(`<button>Search</button>`)
        searchButton.addEventListener('click', this.onSearch.bind(this))
        searchBox.appendChild(inputBox)
        searchBox.appendChild(searchButton)
        modifyCSS(searchBox, { 'position': 'absolute', 'left': 0, 'top': 0 })

        let container: HTMLDivElement | null = this.get('container');
        if (!container) {
            container = this.get('graph').get('container');
        }

        container!.appendChild(searchBox);
        this.set('elem', searchBox);
        this.set('search-input', inputBox);
        this.set('search-btn', searchButton)
    },
    onChange() {

    },
    onSearch() {

    },
    destroy() {
        const menu = this.get('elem');
        const handler = this.get('handler');

        if (menu) {
            menu.parentNode.removeChild(menu);
        }

        if (handler) {
            document.body.removeEventListener('click', handler);
        }
    }
}

G6.registerPlugin('SearchBox', SearchBoxOps)

const data = {
    nodes: [
        {
            id: 'node1',
            x: 150,
            y: 50,
            label: 'node1',
        },
        {
            id: 'node2',
            x: 200,
            y: 150,
            label: 'node2',
        },
        {
            id: 'node3',
            x: 100,
            y: 150,
            label: 'node3',
        },
    ],
    edges: [
        {
            source: 'node1',
            target: 'node2',
        },
        {
            source: 'node2',
            target: 'node3',
        },
        {
            source: 'node3',
            target: 'node1',
        },
    ],
};


let graph: IGraph = null;
const RegisterDemo = () => {
    const container = React.useRef();
    const searchBox = new G6.Plugin['SearchBox']();
    useEffect(() => {
        if (!graph) {
            graph = new Graph({
                container: container.current as string | HTMLElement,
                width: 500,
                height: 500,
                plugins: [searchBox],
                modes: {
                    default: ['drag-canvas', 'zoom-canvas']
                }
            });
            graph.data(data);
            graph.render();
            let width = 500, height = 500;
            graph.on('canvas:click', evt => {
                width += 100;
                height += 50;
                graph.changeSize(width, height)
            });
        }

    });
    return <div ref={container}></div>
}

export default RegisterDemo