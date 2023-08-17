import { useSelector } from "react-redux";
import ButtonCommon from "../../commons/button.common";
import { useNavigate } from "react-router-dom";
import MissCard from "../../components/miss_card";
import ConfirmModal from "../../components/confirm_modal";
import { useState } from "react";
import { deleteMissService } from "../../services/miss.services";

const MissList = () => {
  const navigate = useNavigate()
  const misses = useSelector(state => state.misses);
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const handleDeleteMiss = () => {
    deleteMissService(deleteId,() => {
      setShowDeleteModal(false)
    })
  }

  const handleShowDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  }

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
              <MissCard key={miss._id} miss={miss} isDashboard={true} handleShowDeleteModal={handleShowDeleteModal} />
            )
          })}
        </div>

      </div>
      <ConfirmModal
        text="Are you sure you want to delete?"
        confirmBtnText="Delete"
        showModal={showDeleteModal}
        setShowModal={() => setShowDeleteModal((prev) => !prev)}
        handleConfirm={() => handleDeleteMiss()}
      />
    </div>
  )
}

export default MissList;
