import { useEffect, useState } from "react";

function WindowResizeTracker() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let device = "Desktop";
  if (size.width < 768) device = "Mobile";
  else if (size.width <= 1024) device = "Tablet";

  return (
    <div>
      <h3>{size.width} x {size.height}</h3>
      <p>{device}</p>
    </div>
  );
}

export default WindowResizeTracker;
