import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [formdata, setformdata] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [loading,setloading]=useState(false);
  const [error,seterror]=useState(null);
const navigate = useNavigate();

  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    })
  }
  console.log(formdata);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/signup/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formdata)

        });
      const data = await res.json();
      console.log(data)
      if(data.success===false){
        setloading(false);
        seterror(data.message);
        navigate('/signin')
return;
      }
      setloading(false);
      seterror(null);
      ro

    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong. Please try again.");
      setloading(false);
        seterror(error.message);
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8cccc] px-4">
      <div className="w-full max-w-md bg-[#555252] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create Account</h2>
        <form className="space-y-7 " onSubmit={handleSubmit}>

          <input type="text"
            placeholder='username'
            className='bg-white w-full p-4 rounded-2xl '
            id='username'
            onChange={handleChange}
          />

          <input type="text"
            placeholder='email'
            className='bg-white w-full p-4 rounded-2xl'
            id='email'
            onChange={handleChange} />

<div className='relative'>
          <input
            type={showPassword ? "text" : "password"} // 👈 Show/hide password
            placeholder="password"
            className="bg-white w-full p-4 rounded-2xl pr-12"
            id="password"
            onChange={handleChange} />

          <span
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowPassword(!showPassword)} // 👈 Toggle
          >
            {showPassword ? "🙈" : "👁️"} {/* You can use icons instead */}
          </span>
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
{loading?"Loading...":"Sign Up"}
          </button>
        </form>

        {error && (
  <div className="text-red-500 text-center mt-4">
    {error}
  </div>
)}


        <p className="text-lg text-center text-white mt-4">
          Already have an account?{" "}
          <Link to={'/signin'}  className="text-white hover:underline">
          Sign in
          </Link> 
        </p>

      </div>
    </div>

  );
};

export default SignUp;
