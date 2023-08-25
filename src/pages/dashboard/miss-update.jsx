import ButtonCommon from "../../commons/button.common";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import InputCommon from "../../commons/input.common";
import { useEffect, useState } from "react";
import { createMissService, getMissService, updateMissService } from "../../services/miss.services";
import { toast } from "react-toastify";

const UpdateMiss = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true)
  const id = searchParams.get('id');
  const [miss, setMiss] = useState({
    _id: '',
    name: '',
    age: '',
    height: '',
    weight: '',
    location: '',
    bust: '',
    waist: '',
    hips: '',
    hobby: []
  })

  useEffect(() => {
    if (id) {
      getMissService(id, (err, data) => {
        if (!err) {
          setMiss(data)
          setPreview(data.image);
        }
        setPageLoading(false)
      })
    }
  }, [])

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newHobby, setNewHobby] = useState('');
  const [errors, setErrors] = useState({
    name: undefined,
    image: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    bust: undefined,
    waist: undefined,
    hips: undefined,
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
      bust: undefined,
      waist: undefined,
      hips: undefined,
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

  const addNewHobby = () => {
    if (newHobby === '') return toast.error("Please fill hobby")
    const tempData = { ...miss };
    tempData.hobby.push(newHobby)
    setMiss(tempData);
    setNewHobby('')
  }

  const deleteHobby = (value) => {
    setMiss(prev => ({ ...prev, hobby: miss.hobby.filter(v => v !== value) }));
  }

  const handleSubmit = () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('data', JSON.stringify(miss))
    if (image) {
      formData.append('image', image);
    }

    updateMissService(miss._id, formData, (err) => {
      if (err) setErrors(err);
      else navigate('/dashboard/misses')
      setLoading(false)
    })

  }

  if (pageLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-5 p-5">
        <div className="mb-5 flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3 lg:w-2/3 xl:w-1/2 2xl:w-1/3">
            <p className="text-2xl font-bold text-primary">Edit Miss</p>
          </div>
          <div>
            <ButtonCommon onClick={() => navigate('/dashboard/misses')}><i className="fa-solid fa-arrow-left"></i> Back</ButtonCommon>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row space-x-5 justify-center max-sm:items-center mt-10 space-y-5">
          {preview ? (
            <label htmlFor="profile" className="h-[500px] w-[300px] rounded-lg cursor-pointer bg-center bg-cover" style={{ backgroundImage: `url(${preview})` }}>
              <input type="file" className="hidden" id="profile" onChange={handleChange} accept="image/png, image/jpeg" />
            </label>
          ) : (
            <label htmlFor="profile" className="h-[500px] w-[300px] rounded-lg border border-primary flex justify-center items-center bg-secondary cursor-pointer">
              <i className="fa-solid fa-image text-2xl text-primary"></i>
              <input type="file" className="hidden" id="profile" onChange={handleChange} accept="image/png, image/jpeg" />
            </label>
          )}

          <div className="flex flex-col justify-between">
            <div className="space-y-4">
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
                  label="Height (cm)"
                  placeholder="Miss Height"
                  type="number"
                  value={miss.height}
                  error={errors.height}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
                <InputCommon
                  id="weight"
                  label="Weight (kg)"
                  placeholder="Miss Weight"
                  type="number"
                  value={miss.weight}
                  error={errors.weight}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-x-3">
                <InputCommon
                  id="bust"
                  label="Bust (inches)"
                  placeholder="Miss Bust"
                  type="number"
                  value={miss.bust}
                  error={errors.bust}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
                <InputCommon
                  id="waist"
                  label="Waist (inches)"
                  placeholder="Miss Waist"
                  type="number"
                  value={miss.waist}
                  error={errors.waist}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
                <InputCommon
                  id="hips"
                  label="Hips (inches)"
                  placeholder="Miss Hips"
                  type="number"
                  value={miss.hips}
                  error={errors.hips}
                  onClick={handleClearError}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-x-3">
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
              <div className="flex space-x-3 items-end">
                <InputCommon
                  id="hobby"
                  label="Hobbies"
                  placeholder="add hobby"
                  value={newHobby}
                  onChange={(e) => setNewHobby(e.target.value)}
                />
                <div>
                  <ButtonCommon onClick={() => addNewHobby()}>Add</ButtonCommon>
                </div>
              </div>
              {
                miss.hobby.length > 0 && (
                  <div className="">
                    <ul className="menu bg-base-200 w-56 rounded-box">
                      {
                        miss.hobby.map((h, i) => {
                          return (<li className="flex flex-row justify-between items-center" key={i}>
                            <p>{h}</p>
                            <i className="fa-solid fa-trash text-[red] cursor-pointer" onClick={() => deleteHobby(h)}></i>
                          </li>)
                        })
                      }
                    </ul>
                  </div>
                )
              }
            </div>
            <div className="mt-3">
              <ButtonCommon onClick={handleSubmit} disabled={loading}>Update {loading && <span className="loading loading-spinner loading-xs"></span>}</ButtonCommon>
            </div>
          </div>
        </div>

      </div >
    </div >
  )
}

export default UpdateMiss;
