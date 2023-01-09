import './Loader.css'

export const Loader = ({ height }) => {
  return (
    <div className='loader-container' style={{ height: `${height}` }}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div >
  )
}