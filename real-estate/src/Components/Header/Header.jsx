import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='flex max-w-full h-20 bg-amber-100 rounded-2xl top-2 m-2 mt-0
    justify-between items-center  p-2 relative z-50'>
      <div className='flex justify-between items-center w-full'>

        {/* Logo */}
        <Link to="/">
          <div className='flex items-center gap-2 text-3xl md:text-4xl font-bold'>
            <h1 className='text-red-400'>Al</h1>
            <h1 className='text-slate-400'>Barooj</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className='hidden md:flex text-sm sm:text-lg font-bold max-w-full'>
          <ul className='flex items-center justify-center gap-4'>
            <Link to="/"><li className={`pr-4 pl-4 p-2 rounded-2xl transition-transform ease-in-out duration-300 
                  ${isActive("/") ? "bg-gradient-to-br from-[#ffffff] to-[#2f3f] text-black" : ""}`}>Home</li></Link>
            <Link to="/about"><li className={`pr-4 pl-4 p-2 rounded-2xl transition-transform ease-in-out duration-300 
                  ${isActive("/about") ? "bg-white text-black" : ""}`}>About</li></Link>
            <li className={`pr-4 pl-4 p-2 rounded-2xl transition-transform ease-in-out duration-300 
                  ${isActive("/contact") ? "bg-white text-black" : ""}`}>Contact</li>
          </ul>
        </div>

        {/* Desktop Search */}
        <div className='hidden md:flex'>
          <form className='bg-slate-200 flex justify-between items-center p-2 rounded-2xl'>
            <input
              type="text"
              placeholder='search.....'
              className='focus:outline-none bg-transparent'
            />
            <FaSearch className='text-lg' />
          </form>
        </div>

        {/* ✅ Mobile Menu Icon */}
        <div className='md:hidden text-4xl cursor-pointer'>
          {menuOpen ? (
            <IoCloseSharp onClick={() => setMenuOpen(false)} />
          ) : (
            <HiMenuAlt3 onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* ✅ Slide-out Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-22 right-0 h-1/2 w-2/3  bg-[#ddc5c5] shadow-md 
          transition-transform duration-300 ease-in-out md:hidden z-50 rounded-2xl
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className='p-4 mt-2 grid gap-4'>
          <ul className='grid gap-2 font-bold text-lg text-white'>
            <Link to="/" >
              <li
                className={`p-2 rounded-2xl transition-transform ease-in-out duration-300 
                  ${isActive("/") ? "bg-white text-black" : ""}`}
              >
                Home
              </li>
            </Link>

            <Link to="/about" >
              <li
                className={`p-2 rounded-2 transition duration-200 
                  ${isActive("/about") ? "bg-white text-black" : ""}`}
              >
                About
              </li>
            </Link>

            <li className='hover:bg-white hover:text-white p-2 rounded'>Contact</li>
          </ul>

          <form className='bg-slate-200 flex justify-between items-center p-2 rounded-2xl'>
            <input
              type="text"
              placeholder='search.....'
              className='focus:outline-none bg-transparent w-full'
            />
            <FaSearch className='text-lg' />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
