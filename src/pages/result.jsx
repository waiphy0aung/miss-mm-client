import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import ShowCounter from "../components/show_counter";
import moment from "moment";
import ButtonCommon from "../commons/button.common";

const ResultPage = () => {

  const useCountdown = (targetDate) => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
      countDownDate - new Date().getTime()
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
  };

  const getReturnValues = (countDown) => {
    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

    return [hours, minutes, seconds];
  };

  const navigate = useNavigate();
  const categories = useSelector(state => state.categories);
  let misses = useSelector(state => state.misses);
  const lock = useSelector(state => state.lock);

  misses.forEach(miss => {
    categories.forEach(category => {
      if (!miss.voteCount[category.slug]) miss.voteCount[category.slug] = 0;
    })
  })

  const [hours, minutes, seconds] = useCountdown(new Date(lock?.votingTime).getTime())

  return (
    <>
      <div className="px-5">
        <div className="text-sm breadcrumbs my-4">
          <ul>
            <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
            <li>Result</li>
          </ul>
        </div>

        {
          hours + minutes + seconds <= 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Winner</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    const winner = misses.sort((a, b) => b.voteCount[category.slug] - a.voteCount[category.slug])[0]

                    return (
                      <tr key={category._id}>
                        <th>{index + 1}</th>
                        <td className="font-semibold whitespace-nowrap">{category.name}</td>
                        <td className="font-semibold whitespace-nowrap">{winner.voteCount[category.slug] === 0 ? '' : winner.name}</td>
                        <td className="flex space-x-3">
                          <p className="underline text-primary cursor-pointer" onClick={() => navigate('/miss-detail/'+winner._id)}>Details</p>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <ShowCounter
                hours={hours}
                minutes={minutes}
                seconds={seconds}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

export default ResultPage;
