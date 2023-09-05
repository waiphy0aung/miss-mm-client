import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import ButtonCommon from "../commons/button.common";
import ImageLoader from "react-load-image";
import { getMissService } from "../services/miss.services";
import { useEffect, useState } from "react";

const MissDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [miss,setMiss] = useState(undefined)

  useEffect(() => {
    getMissService(id,(err,data) => {
      if(!err && data){
        setMiss(data)
      }
    })
  },[])

  return (
    <div className="h-full">
      <div className="p-5 mb-5">
        <div className="flex justify-between items-center">
          <div className="text-sm breadcrumbs my-4">
            <ul>
              <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
              <li className="text-primary"><a>Miss</a></li>
              <li>{miss?.name}</li>
            </ul>
          </div>
          <div>
            <ButtonCommon onClick={() => navigate('/result')}><i className="fa-solid fa-arrow-left"></i> Back</ButtonCommon>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-3 items-center justify-center">
          <ImageLoader
            src={miss?.image}
          >
            <img className="h-[500px] w-full transition-all object-cover rounded-lg" src={miss?.image} />
            <div>Error!</div>
            <div className="h-[500px] w-[300px] flex justify-center items-center">
              <span className="loading loading-dots loading-lg text-primary"></span>
            </div>
          </ImageLoader>
          <div className="card-body text-primary w-full">
            <h2 className="card-title">{miss?.name}</h2>
            <p>Age: <span className="text-black">{miss?.age}</span></p>
            <p>Height: <span className="text-black">{miss?.height} cm</span></p>
            <p>Weight: <span className="text-black">{miss?.weight} kg</span></p>
            <p>Body Ratio: <span className="text-black">{miss?.bust + '" ' + miss?.waist + '" ' + miss?.hips + '"'}</span></p>
            <p>Address: <span className="text-black">{miss?.location}</span></p>
            <p>Hobby: <span className="text-black">{miss?.hobby.join(", ")}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissDetail
