import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import ImageUpload from './ImageUpload'
import ColorPicker from './ColorPicker'

// TODO: Boton debajo de CUSTOMIZE IT, dicho boton te permite añadir una escena visual al modelo
// TODO: Escena visual 1: VideoPoints de fondo con musica
// TODO: Escena visual 2: Vitrina expositoria con videoclip musical en texturas
// TODO: Escena visual 3: Videoclip gata cattana modelo 3d sustituye al caballo

export function Overlay() {
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <Logo width="40" height="40" />
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
          <AiOutlineShopping size="3em" />
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h1>LET'S DO IT.</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}>
                  <p>
                    Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> and define your
                    own style.
                  </p>
                  <button style={{ background: snap.color }} onClick={() => (state.intro = false)}>
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            <Customizer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

function Customizer() {
  const snap = useSnapshot(state)
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}

        <ColorPicker />
      </div>
      {/* <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
              <img src={decal + '_thumb.png'} alt="brand" />
            </div>
          ))}
        </div>
      </div> */}
      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
      <input
        type="checkbox"
        onChange={(e) => (state.decalDebugVisible = !snap.decalDebugVisible)}
        value={snap.decalDebugVisible}
        checked={snap.decalDebugVisible}
      />
      <div className="transform-position">
        <input
          type="range"
          onChange={(e) => (state.decalTransform.position.x = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.position.x * 100.0}></input>
        <input
          type="range"
          onChange={(e) => (state.decalTransform.position.y = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.position.y * 100.0}></input>
        <input
          type="range"
          onChange={(e) => (state.decalTransform.position.z = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.position.z * 100.0}></input>
      </div>
      <div className="transform-rotation">
        <input
          type="range"
          onChange={(e) => (state.decalTransform.rotation.x = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.rotation.x * 100.0}></input>
        <input
          type="range"
          onChange={(e) => (state.decalTransform.rotation.y = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.rotation.y * 100.0}></input>
        <input
          type="range"
          onChange={(e) => (state.decalTransform.rotation.z = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.rotation.z * 100.0}></input>
        <input
          type="range"
          onChange={(e) => (state.decalTransform.scale.z = e.target.value / 100.0)}
          min={-100 * snap.inputRangeAmplitude}
          max={100 * snap.inputRangeAmplitude}
          step={1}
          value={snap.decalTransform.scale.z * 100.0}></input>
        <ImageUpload />
      </div>
      <SelectCustomControlUI />
      <SelectCustomModelUI />
    </div>
  )
}

// TODO
export function SelectCustomControlUI() {
  const snap = useSnapshot(state)
  // cambiar state.typeControl
  return (
    <div className="select-custom-control-ui">{/* TODO: NEW: hacerlo con div igual que Customizer OLD: input radio button con cada opcion de control */}</div>
  )
}

// TODO
export function SelectCustomModelUI() {
  const snap = useSnapshot(state)
  // cambiar state.typeModel
  return <div className="select-custom-model-ui">{/* TODO: input radio button con cada opcion de modelo */}</div>
}
