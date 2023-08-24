import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="px-5">
        <div className="text-sm breadcrumbs my-4">
          <ul>
            <li className="text-primary"><a onClick={() => navigate('/')}>Home</a></li>
            <li>contact</li>
          </ul>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col items-center space-y-3 text-2xl">
            <i className="fa-solid fa-phone text-primary"></i>
            <p className="text-2xl">+959755804030</p>
          </div>
          <div className="flex flex-col items-center space-y-3 text-2xl">
            <i className="fa-solid fa-envelope text-primary"></i>
            <p className="text-2xl">+959755804030</p>
          </div>
          <div className="flex flex-col items-center space-y-3 text-2xl">
            <i className="fa-brands fa-facebook text-primary"></i>
            <a href="https://www.facebook.com/thitarhtwe.thitarhtwe.9" target="_blank"><p className="text-2xl">Thi Tar Htwe</p></a>
            
          </div>
        </div>

      </div>
    </>
  )
}

export default Contact;
