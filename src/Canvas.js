import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center, OrbitControls } from '@react-three/drei'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { TypeControlEnum, TypeModelEnum, state } from './store'
import { LeePerrySmith, LeePerrySmithDecal } from './drei-espinaco/prefabs/LeePerrySmith/LeePerrySmith'

// TODOS:
// 1: Cambiar de mesh (cabeza humana o camiseta) (poner un string en store llamado meshName y controlar desde ahi el mesh que se muestra)
// 2: Subir logo desde la computadora
// 3: Subir mesh desde la computadora

// Lo importante es no poner string a pelo en el codigo

export const CustomControls = ({ children, ...props }) => {
  const snap = useSnapshot(state)
  if (snap.typeControl === TypeControlEnum.ORBIT_CONTROLS) {
    return (
      <>
        <OrbitControls />
        {[children]}
      </>
    )
  }
  if (snap.typeControl === TypeControlEnum.CAMERA_RIG) {
    return <CameraRig>{[children]}</CameraRig>
  }
  return null
}

export const CustomModel = () => {
  const snap = useSnapshot(state)
  if (snap.typeModel === TypeModelEnum.LEERRYPEESMITH) {
    return <LeePerrySmithDecal />
  }
  if (snap.typeModel === TypeModelEnum.T_SHIRT) {
    return <Shirt />
  }
  return null
}

export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <Canvas shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client">
    <ambientLight intensity={0.5} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

    {/* <CameraRig> */}
    <CustomControls>
      <Backdrop />
      <Center>
        {/* <Shirt /> */}
        {/* <LeePerrySmithDecal /> */}
        <CustomModel />
      </Center>
    </CustomControls>
    {/* <OrbitControls /> */}
    {/* </CameraRig> */}
  </Canvas>
)

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.14]}>
      <RandomizedLight amount={4} radius={9} intensity={0.55} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}

function CameraRig({ children }) {
  const group = useRef()
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  })
  return <group ref={group}>{children}</group>
}

function Shirt(props) {
  const snap = useSnapshot(state)
  const texture = useTexture(`${snap.decalName}`)
  const { nodes, materials } = useGLTF('/shirt_baked_collapsed.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))
  return (
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      {snap.decalDebugVisible ? (
        <Decal
          debug
          position={[snap.decalTransform.position.x, snap.decalTransform.position.y, snap.decalTransform.position.z]}
          rotation={[snap.decalTransform.rotation.x, snap.decalTransform.rotation.y, snap.decalTransform.rotation.z]}
          scale={snap.decalTransform.scale.z}
          map={texture}
          map-anisotropy={16}
        />
      ) : (
        <Decal
          position={[snap.decalTransform.position.x, snap.decalTransform.position.y, snap.decalTransform.position.z]}
          rotation={[snap.decalTransform.rotation.x, snap.decalTransform.rotation.y, snap.decalTransform.rotation.z]}
          scale={snap.decalTransform.scale.z}
          map={texture}
          map-anisotropy={16}
        />
      )}
    </mesh>
  )
}

useGLTF.preload('/shirt_baked_collapsed.glb')
;['/react.png', '/three2.png', '/pmndrs.png'].forEach(useTexture.preload)
