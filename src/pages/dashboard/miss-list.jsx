import { useSelector } from "react-redux";
import ButtonCommon from "../../commons/button.common";
import { useNavigate } from "react-router-dom";

const MissList = () => {
  const navigate = useNavigate()
  const misses = useSelector(state => state.misses);

  return (
    <div className="h-full">
      <div className="mb-5 py-5 pr-4">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Misses List</p>
          </div>
          <div>
            <ButtonCommon onClick={() => navigate('/dashboard/misses/create')}>Add New Miss</ButtonCommon>
          </div>
        </div>

        <div className="grid sm:grid-cols-1 xl:grid-cols-3 gap-3">
          {misses.map(miss => {
            return (
              <div className="card lg:card-side bg-base-100 shadow-xl flex h-[300px]" key={miss._id}>
                <figure><div className={`h-full w-[200px] bg-center bg-cover`} style={{backgroundImage: `url(${miss.image})`}}></div></figure>
                <div className="card-body text-primary bg-secondary">
                  <h2 className="card-title">{miss.name}</h2>
                  <p>Age: <span className="text-black">{miss.age}</span></p>
                  <p>Height: <span className="text-black">{miss.height} cm</span></p>
                  <p>Weight: <span className="text-black">{miss.weight} kg</span></p>
                  <p>Address: <span className="text-black">{miss.location}</span></p>
                  <p>Hobby: <span className="text-black">{miss.hobby.join(", ")}</span></p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Vote</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default MissList;
