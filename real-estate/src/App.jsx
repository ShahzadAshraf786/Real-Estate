import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';

const AppContent = () => {
  const location = useLocation();

  // Add all paths where you want to hide the Header
  const hideHeaderPaths = ['/sign-up','/sign-in'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='sign-in' element={<SignIn />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
