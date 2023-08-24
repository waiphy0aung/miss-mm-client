import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCommon from "../commons/button.common";
import { logoutService } from "../services/auth.service";
import Header from "../components/header";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(1)

  useEffect(() => {
    let intervalId = setInterval(() => {
      setSelectedImage(selectedImage + 1 > 4 ? 1 : selectedImage + 1);
    }, 3000);

    return () => clearInterval(intervalId)
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center space-y-[50px]">
      <div className="relative w-full">
        <div className="w-full h-[250px] xl:h-[500px] transition-all duration-1000 bg-center bg-cover" style={{ backgroundImage: `url('/covers/${selectedImage}.jpg')` }} />
      </div>
      <p className="font-bold text-primary text-2xl">Miss Myanmar Voting System</p>
      <div className="flex justify-center">
        <ButtonCommon onClick={() => navigate('/category')}>Start Vote</ButtonCommon>
      </div>
    </div>

  )
}

export default Home;
