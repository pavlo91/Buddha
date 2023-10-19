import './index.scss'

export const Particle = () => {
  return (
    <div className="wrap">
      {new Array(300).fill(10).map((item, index) => (
        <div className="c" key={'particle' + index}></div>
      ))}
    </div>
  )
}

export default Particle
