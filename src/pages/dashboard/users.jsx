import { useSelector } from "react-redux";
import ButtonCommon from "../../commons/button.common";
import ConfirmModal from "../../components/confirm_modal";
import { useState } from "react";
import { deleteUserService } from "../../services/users.service";

const UserList = () => {
  let users = useSelector(state => state.users);
  const categories = useSelector(state => state.categories);
  const misses = useSelector(state => state.misses);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  }

  const deleteUser = () => {
    deleteUserService(deleteId, () => {
      setShowModal(prev => !prev)
    });
  }

  return (
    <div className="h-full">
      <div className="mb-5 p-5">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Users List</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Votes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="font-semibold">{user?.name}</td>
                    <td className="font-semibold">{user.email}</td>
                    <td className="">
                      {
                        Object.values(user?.votes).length > 0 && (
                          <ul className="menu bg-base-200 rounded-box">
                            {
                              user?.votes?.map(vote => {
                                return <li key={vote._id}><a className="whitespace-nowrap">{categories?.find(v => v._id === vote.categoryId)?.name}: <span className="text-primary font-semibold">{misses?.find(v => v._id === vote.missId)?.name}</span></a></li>
                              })
                            }
                          </ul>
                        )
                      }

                    </td>
                    <td className="flex space-x-3">
                      {user?.role !== "admin" && (<i className="fa-solid fa-trash text-[red] cursor-pointer" onClick={() => showDeleteModal(user._id)}></i>)}
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>
        <ConfirmModal
          text="Are you sure you want to delete?"
          confirmBtnText="Delete"
          showModal={showModal}
          setShowModal={() => setShowModal((prev) => !prev)}
          handleConfirm={() => deleteUser()}
        />
      </div>
    </div>
  )
}

export default UserList;
