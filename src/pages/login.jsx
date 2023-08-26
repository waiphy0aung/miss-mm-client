import { useMemo, useState } from "react";
import ButtonCommon from "../commons/button.common";
import InputCommon from "../commons/input.common";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.service";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: undefined,
    password: undefined,
  });

  const isLoginDisable = useMemo(() => Object.keys(JSON.parse(JSON.stringify(errors))).length > 0, [errors]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputs(preInput => ({ ...preInput, [id]: value }))
  };

  const handleClearError = () => setErrors({ username: undefined, password: undefined });

  const handleLoginForm = async () => {
    setLoading(true)
    await loginService(inputs, navigate, err => {
      if (err) {
        setErrors(err);
      }else{
        // window.location.pathname = '/'
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
            className="cursor-pointer"
            onClick={() => navigate('/')}
          />
        </h1>

        <div>
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

          <div className="flex items-center justify-center">
            <ButtonCommon
              disabled={isLoginDisable || loading}
              onClick={handleLoginForm}
            >
              Log In {loading && <span className="loading loading-spinner loading-xs"></span>}
            </ButtonCommon>
          </div>

          <p className="mt-4 text-center text-sm font-light">
            Don't have an account? <span className="cursor-pointer text-primary font-semibold" onClick={() => navigate('/register')}>Register</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;
