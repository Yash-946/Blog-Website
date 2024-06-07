import { useNavigate } from 'react-router-dom';
import Auth from '../components/Auth'
import Quote from '../components/Quote'
import { useEffect } from 'react';

function Signin() {
  const token = localStorage.getItem("token");
  
  const navigate = useNavigate();
  useEffect(() => {
    if(token){
      navigate("/blogs")
      return;
    }
  }, [])
  
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type={"signin"}/>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}

export default Signin