import { useState } from "react";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const categories = useSelector(state => state.categories);
  const misses = useSelector(state => state.misses);
  const [selectedCategory,setSelectedCategory] = useState(categories[0]?.slug);

  return (
    <div className="h-full">
      <div className="mb-5 p-5">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Dashboard</p>
          </div>
        </div>

        <div className="flex items-start xl:w-1/3 mb-3">
          <select className="select select-bordered w-full max-w-xs" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {
              categories.map((category) => {
                return (
                  <option value={category.slug} key={category._id}>{category.name}</option>
                )
              })
            }
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {misses.sort((a,b) => a.voteCount[selectedCategory] > b.voteCount[selectedCategory] ? 0 : 1).map((miss, index) => {
                return (
                  <tr key={miss._id} className={
                    miss.voteCount[selectedCategory] > 0 ? index === 0 ? 'bg-yellow-600 text-white' : index === 1 ? 'bg-primary text-white' : index === 2 ? 'bg-cyan-500 text-white' : '' : ''
                  }>
                    <th>{index + 1}</th>
                    <td className="font-semibold">{miss.name}</td>
                    <td className="font-semibold">{miss.location}</td>
                    <td className="font-semibold">{miss.voteCount[selectedCategory] || 0}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Dashboard;
