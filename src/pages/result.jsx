import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useSelector } from "react-redux";

const ResultPage = () => {
  const navigate = useNavigate();
  const categories = useSelector(state => state.categories);
  const misses = useSelector(state => state.misses);

  return (
    <>
      <Header />

      <div className="px-10">
        <div className="text-sm breadcrumbs my-4">
          <ul>
            <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
            <li>Result</li>
          </ul>
        </div>


      </div>
    </>
  )
}

export default ResultPage;
