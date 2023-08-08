import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react.png', 'three2.png', 'pmndrs.png'],
  color: '#EFBD4E',
  decalName: 'three2.png',
  decalDebugVisible: true,
  decalTransform: {
    position: {
      x: 0,
      y: 0.04,
      z: 0.15
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0
    },
    scale: {
      x: 1,
      y: 1,
      z: 0.15
    }
  }
})

export { state }
