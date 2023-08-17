import { useNavigate } from "react-router-dom";
import ButtonCommon from "../commons/button.common";

const MissCard = ({ miss, isDashboard, handleShowDeleteModal }) => {
  const navigate = useNavigate()

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl flex min-h-[300px]">
      <figure><div className={`h-full w-[200px] bg-center bg-cover`} style={{ backgroundImage: `url(${miss.image})` }}></div></figure>
      <div className="card-body text-primary bg-secondary">
        <h2 className="card-title">{miss.name}</h2>
        <p>Age: <span className="text-black">{miss.age}</span></p>
        <p>Height: <span className="text-black">{miss.height} cm</span></p>
        <p>Weight: <span className="text-black">{miss.weight} kg</span></p>
        <p>Address: <span className="text-black">{miss.location}</span></p>
        <p>Hobby: <span className="text-black">{miss.hobby.join(", ")}</span></p>
        <div className="card-actions justify-end flex space-x-3">
          {isDashboard ? (
            <>
              <i className="fa-solid fa-edit cursor-pointer" onClick={() => navigate('/dashboard/misses/update?id='+miss._id)}></i>
              <i className="fa-solid fa-trash text-[red] cursor-pointer" onClick={() => handleShowDeleteModal(miss._id)}></i>
            </>
          ) : (
            <ButtonCommon>Vote</ButtonCommon>
          )}
        </div>
      </div>

    </div>
  )
}

export default MissCard;
