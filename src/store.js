import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#EFBD4E',
  decal: 'three2',
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
