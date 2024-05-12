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
      const moveX = ((relX - rect.width / 2) / rect.width) * 50;
      let moveY = ((relY - rect.height / 2) / rect.height) * 50; // scale adjusted to limit the movement up to 200px
      moveY = Math.max(Math.min(moveY, 70), -70); // Ensures that moveY stays within -100px to +100px range

      gsap.to(circle, {
        duration: 0.3,
        x: moveX / 2,
        y: moveY / 2,
      });
      gsap.to(hamburger, {
        duration: 0.3,
        x: moveX / 1, // Half the horizontal movement for subtle effect
        y: moveY / 1, // Half the vertical movement
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
    <button ref={containerRef} onClick={onClick} className="z-30 overflow-hidden hover:border-blue-500 flex justify-center items-center relative w-40 h-40 cursor-pointer">
      <div ref={circleRef} className="absolute bg-knap-10 h-14 w-14 rounded-full hover:border-blue-500 border-2 border-gray-500 opacity-0">
        {/* Circle initially invisible */}
      </div>
      <div ref={hamburgerRef} className="absolute text-bono-10 text-5xl">
        = {/* Hamburger always visible */}
      </div>
    </button>
  );
};

export default FollowButton;
