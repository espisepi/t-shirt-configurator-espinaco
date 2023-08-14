import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const PATH_MAP_TEXTURE = 'models/LeePerrySmith/Map-COL.jpg'
const PATH_MAP_SPECULAR_TEXTURE = 'models/LeePerrySmith/Map-SPEC.jpg'
const PATH_MAP_NORMAL_TEXTURE = 'models/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg'
const PATH_MODEL_LEEPERRYSMITH = 'models/LeePerrySmith/LeePerrySmith.glb'

export function LeePerrySmith({ children, ...props }) {
  const [map, specularMap, normalMap] = useTexture([PATH_MAP_TEXTURE, PATH_MAP_SPECULAR_TEXTURE, PATH_MAP_NORMAL_TEXTURE])
  map.colorSpace = THREE.SRGBColorSpace

  const { nodes, materials } = useGLTF(PATH_MODEL_LEEPERRYSMITH)

  return (
    <mesh
      castShadow
      scale={[0.1, 0.1, 0.1]}
      geometry={nodes.LeePerrySmith.geometry}
      material={
        new THREE.MeshPhongMaterial({
          specular: 0x111111,
          map: map,
          specularMap: specularMap,
          normalMap: normalMap,
          shininess: 25
        })
      }
      {...props}
      dispose={null}></mesh>
  )
}
