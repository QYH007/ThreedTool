<p align="center">
  <a href="https://threed.now.sh/" target="blank"><img src="resources/logo.png" width="350" alt="threeD Logo" /></a>
</p>

An update of the WebGL Teaching App build with :heart: @uzh

This app is using [@react-three/fiber](https://github.com/react-spring/@react-three/fiber) reconciler under the hood.

## Development

**install packages**

```bash
npm install -force
```

**development**

spins up a server on PORT 3000

```bash
npm run start
```

or run this if you meet openssl issue

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run start
```

**build**

```bash
npm run build
```

## Main Features

**Polygonal models**

- 展示几何物体、mesh。提供可交互操作面板，更改物体属性
  ![300](/img/bunny.png)

- 加载.obj, .glb, .pcd 文件
  ![300](/img/usermesh.png)

- 为.obj 文件添加纹理贴图
  ![300](/img/texture.png)

**Physical based rendering**

- 展示不同的材质贴图和 BSDF 参数，已提供若干预设
  ![300](/img/sphere.png)
  ![300](/img/torus.png)
  ![300](/img/gun.png)

**Ambient occlusion**

- 展示环境光遮蔽（AO）效果
  ![30](/img/ao.png)

**Transformation**

- 展示空间移动、旋转、缩放操作的过程，支持自定义变换序列并播放动画。
  ![30](/img/tansformation.png)

**Illumination**

- 展示基本光源：directional light, spot light, point light，提供可调节参数控制场景光源。
  ![30](/img/illumination.png)

**Texture Mapping**

- 展示投影贴图效果，支持对贴图的空间变换操作
  ![30](/img/texturemap.png)

- 展示几种抗锯齿技术，支持左右对比
  ![30](/img/mipmapping.png)
