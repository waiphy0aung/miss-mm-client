import { useSelector } from "react-redux";
import ButtonCommon from "../../commons/button.common";
import InputCommon from "../../commons/input.common";
import { useEffect, useState } from "react";
import { addCategoryService, deleteCategoryService, updateCategoryService } from "../../services/category.service";

const CategoryList = () => {
  let categories = useSelector(state => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    name: undefined
  })
  const [editData,setEditData] = useState(null);

  const addCategory = () => {
    setLoading(true)
    addCategoryService({ name }, (err) => {
      if (err) setErrors(err)
      setName('')
      setLoading(false)
    });
  }

  const updateCategory = () => {
    setLoading(true)
    updateCategoryService(editData._id,editData,(err) => {
      if(err) setErrors(err);
      setEditData(null)
      setLoading(false)
    })
  }

  const deleteCategory = (id) => {
    deleteCategoryService(id);
  }

  return (
    <div className="h-full">
      <div className="mb-5 py-5 pr-4">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Categories List</p>
          </div>
        </div>

        <div className="flex items-center gap-x-3 xl:w-1/3 mb-3">
          <InputCommon
            id="addCategory"
            value={editData ? editData.name : name}
            onChange={e => editData ? setEditData(prev => ({...prev,name: e.target.value})) : setName(e.target.value)}
            placeholder={editData ? 'Update category' : 'Add new category'}
            error={errors.name}
            onClick={() => setErrors({ name: undefined })}
          />
          <div className="flex items-center justify-center">
            <ButtonCommon onClick={() => editData ? updateCategory() : addCategory()}>
              {editData ? 'Update Category' : 'Add Category'} {loading && <span className="loading loading-spinner loading-xs"></span>}
            </ButtonCommon>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td className="font-semibold">{category.name}</td>
                    <td className="flex space-x-3">
                      <i className="fa-solid fa-edit cursor-pointer" onClick={() => setEditData(category)}></i>
                      <i className="fa-solid fa-trash text-[red] cursor-pointer" onClick={() => deleteCategory(category._id)}></i>
                    </td>
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

export default CategoryList;
