import { useSelector } from "react-redux";

const Home = () => {
  const categories = useSelector(state => state.categories);

  return (
    <div className="h-full bg-secondary flex justify-center py-10">
      <div className="">
        <img src="/logo_long.png" className="h-[100px]" />
      </div>
      <div className="">
        
      </div>
    </div>

  )
}

export default Home;
