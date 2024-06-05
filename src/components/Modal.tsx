
export default function Modal({ onClose, children }:any) {

  return (
    <div className="fixed inset-0 flex items-center  justify-center z-40">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg w-[80vw] p-8 ">
        <button className="absolute top-0 right-0 p-2 text-lg" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}


