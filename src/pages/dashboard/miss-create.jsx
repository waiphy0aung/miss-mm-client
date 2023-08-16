import ButtonCommon from "../../commons/button.common";
import { useNavigate } from "react-router-dom";
import InputCommon from "../../commons/input.common";
import { useState } from "react";
import { createMissService } from "../../services/miss.services";

const CreateMiss = () => {
  const navigate = useNavigate()
  const [miss, setMiss] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    location: '',
    hobby: []
  })
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({
    name: undefined,
    image: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    location: undefined,
    hobby: undefined
  })

  const handleClearError = () => {
    setErrors({
      name: undefined,
      image: undefined,
      age: undefined,
      height: undefined,
      weight: undefined,
      location: undefined,
      hobby: undefined
    })
  }

  const handleChange = (e) => {
    const { value, id, type } = e.target;
    if (type === 'file') {
      setImage(e.target.files[0])
      setPreview(URL.createObjectURL(e.target.files[0]))
      return
    }
    setMiss(prev => ({ ...prev, [id]: type === "number" ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log(miss)
    formData.append('data', JSON.stringify(miss))
    formData.append('image', image);

    createMissService(formData, (err) => {
      if (err) setErrors(err);
    })

  }

  return (
    <div className="h-full">
      <div className="mb-5 py-5 pr-4">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Create New Miss</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row space-x-5 justify-center mt-10">
          {preview && image ? (
            <label htmlFor="profile" className="h-[500px] w-[300px] rounded-lg cursor-pointer bg-center bg-cover" style={{ backgroundImage: `url(${preview})` }}>
              <input type="file" className="hidden" id="profile" onChange={handleChange} />
            </label>
          ) : (
            <label htmlFor="profile" className="h-[500px] w-[300px] rounded-lg border border-primary flex justify-center items-center bg-secondary cursor-pointer">
              <i className="fa-solid fa-image text-2xl text-primary"></i>
              <input type="file" className="hidden" id="profile" onChange={handleChange} />
            </label>
          )}

          <div className="flex flex-col justify-between">
            <form className="space-y-3" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-x-3">
                <InputCommon
                  id="name"
                  label="Name"
                  placeholder="Miss Name"
                  value={miss.name}
                  error={errors.name}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
                <InputCommon
                  id="age"
                  label="Age"
                  placeholder="Miss Age"
                  type="number"
                  value={miss.age}
                  error={errors.age}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <InputCommon
                  id="height"
                  label="Height"
                  placeholder="Miss Height"
                  type="number"
                  value={miss.height}
                  error={errors.height}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
                <InputCommon
                  id="weight"
                  label="Weight"
                  placeholder="Miss Weight"
                  type="number"
                  value={miss.weight}
                  error={errors.weight}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-3">
                <InputCommon
                  id="location"
                  label="Address"
                  placeholder="Miss Address"
                  value={miss.location}
                  error={errors.location}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
              </div>
            </form>
            <div className="">
              <ButtonCommon onClick={handleSubmit}>Add</ButtonCommon>
            </div>
          </div>
        </div>

      </div >
    </div >
  )
}

export default CreateMiss;