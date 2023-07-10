import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({path="login"}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    if (count === 0) {
      navigate(`/${path}`, { state: location.pathname });
    }
    return () => clearInterval(interval);
  }, [count, navigate, location,path]);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div
          className="inline-block  h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <h1 className="text-3xl">Redirecting you in {count} seconds </h1>
      </div>
    </>
  );
};

export default Spinner;
