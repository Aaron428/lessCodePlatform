import './index.css'

const Editotr = () => {
  const handleDrop = () => {}

  return (
    <div className="editor" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
      Editotr
    </div>
  )
}

export default Editotr
