import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShowCounter from "../components/show_counter";
import moment, { min } from "moment";

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
  const misses = useSelector(state => state.misses);
  const lock = useSelector(state => state.lock);

  const dateTimeAfterThreeDays = new Date(lock?.votingTime).getTime();
  console.log(dateTimeAfterThreeDays)
  console.log(moment(lock?.votingTime).format("DD H:mm a"))

  const [hours, minutes, seconds] = useCountdown(dateTimeAfterThreeDays)
  console.log(hours, minutes, seconds)


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

        {
          hours + minutes + seconds <= 0 ? (
            <div></div>
          ) : (
            <ShowCounter
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          )
        }
      </div>
    </>
  )
}

export default ResultPage;
