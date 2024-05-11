import { useRef, useEffect } from "react";
import gsap from "gsap";

const FollowButton = ({ onClick }) => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const circle = circleRef.current;
    const hamburger = hamburgerRef.current;

    const handleMouseEnter = () => {
      gsap.to(container, { duration: 0.3, scale: 1.3 });
      gsap.to(circle, { duration: 0.3, scale: 1.3, autoAlpha: 1 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { duration: 0.3, scale: 1 });
      gsap.to(circle, { duration: 0.3, scale: 1, autoAlpha: 0, x: 0, y: 0 });
      gsap.to(hamburger, { duration: 0.3, scale: 1, x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      gsap.to(circle, {
        duration: 0.3,
        x: ((relX - rect.width / 2) / rect.width) * 80,
        y: ((relY - rect.height / 2) / rect.height) * 80,
      });
      gsap.to(hamburger, {
        duration: 0.3,
        x: ((relX - rect.width / 2) / rect.width) * 40,
        y: ((relY - rect.height / 2) / rect.height) * 40,
      });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} onClick={onClick} className="z-30 overflow-hidden hover:border-blue-500 flex justify-center items-center relative w-40 h-40 cursor-pointer">
      <div ref={circleRef} className="absolute h-14 w-14 rounded-full hover:border-blue-500 border-2 border-gray-500 opacity-0">
        {/* Circle initially invisible */}
      </div>
      <div ref={hamburgerRef} className="absolute text-bono-10 text-4xl">
        = {/* Hamburger always visible */}
      </div>
    </div>
  );
};

export default FollowButton;
