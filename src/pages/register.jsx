import { useMemo, useState } from "react";
import ButtonCommon from "../commons/button.common";
import InputCommon from "../commons/input.common";
import { useNavigate } from "react-router-dom";
import { registerService } from "../services/auth.service";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading,setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  });

  const isRegisterDisable = useMemo(() => Object.keys(JSON.parse(JSON.stringify(errors))).length > 0, [errors]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputs(preInput => ({ ...preInput, [id]: value }))
  };

  const handleClearError = () => setErrors({ name: undefined, username: undefined, password: undefined, confirmPassword: undefined });

  const handleRegisterForm = async () => {
    setLoading(true)
    if(inputs.password !== '' && inputs.confirmPassword !== '' && inputs.confirmPassword !== inputs.password){
      setLoading(false)
      return setErrors(prev => ({...prev,confirmPassword: 'password not match'}))
    }
    let inputData = {...inputs};
    delete inputData.confirmPassword
    registerService(inputData,navigate,err => {
      if(err){
        setErrors(err);
      }
      setLoading(false)
    })
  };

  return (
    <div className="h-full flex items-center justify-center p-10 bg-secondary">
      <div className="shadow-lg m-auto w-full max-w-md rounded-lg bg-white px-10 py-5">
        <h1 className="mb-10 flex items-center justify-center">
          <img
            src="./logo_long.png"
            height={40}
          />
        </h1>

        <div>
          <div className="mb-5">
            <InputCommon
              id="name"
              label="Name"
              placeholder="Your Name"
              value={inputs.name}
              error={errors.name}
              onClick={handleClearError}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-5">
            <InputCommon
              id="email"
              label="Email"
              placeholder="Your Email"
              value={inputs.email}
              error={errors.email}
              onClick={handleClearError}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-6">
            <InputCommon
              id="password"
              label="Password"
              type="password"
              placeholder="Your Password"
              value={inputs.password}
              error={errors.password}
              onClick={handleClearError}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <InputCommon
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              error={errors.confirmPassword}
              onClick={handleClearError}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <ButtonCommon
              disabled={isRegisterDisable || loading}
              onClick={handleRegisterForm}
            >
              Register {loading && <span className="loading loading-spinner loading-xs"></span>}
            </ButtonCommon>
          </div>

          <p className="mt-4 text-center text-sm font-light">
            If you have already an account, <span className="cursor-pointer text-primary font-semibold" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;
