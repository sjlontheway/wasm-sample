import G6, { IGroup, ModelConfig } from '@antv/g6';
const type = 'Bezier-Combo';
G6.registerEdge(type, {
    draw(cfg: ModelConfig, group: IGroup) {
        const startPoint = cfg?.startPoint;
        const endPoint = cfg?.endPoint;
        const positions = cfg?.positions as [number, number][];
        let path = `M ${startPoint?.x},${startPoint?.y} C`;
        for (let i = 1; i < positions.length - 1; i++) {
            path += `${positions[i][0]},${positions[i][1]} `;
        }
        path += `${endPoint?.x},${endPoint?.y} `;
        const shape = group?.addShape('path', {
            attrs: {
                path: path,
                stroke: 'steelblue',
                linewidth: 3,
                endArrow: {
                    // 自定义箭头指向(0, 0)，尾部朝向 x 轴正方向的 path
                    path: 'M 0,0 L 8,4 L 8,-4 Z',
                    // 箭头的偏移量，负值代表向 x 轴正方向移动
                    // d: -10,
                    // v3.4.1 后支持各样式属性
                    fill: '#333',
                    stroke: '#666',
                    opacity: 0.8,
                    // ...
                },
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
        });
        return shape;
    },
});

export default type;
