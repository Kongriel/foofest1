import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

const FollowButton = ({ onClick }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null); // Rename circleRef to contentRef for clarity
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const hamburger = hamburgerRef.current;

    const handleMouseEnter = () => {
      gsap.to(container, { duration: 0.3, scale: 1.1 });
      gsap.to(content, { duration: 0.3, scale: 1.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { duration: 0.3, scale: 1 });
      gsap.to(content, { duration: 0.3, scale: 1, x: 0, y: 0 });
      gsap.to(hamburger, { duration: 0.3, scale: 1, x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      // Calculating the movement with a max of 200px in either direction
      const moveX = ((relX - rect.width / 2) / rect.width) * 35;
      let moveY = ((relY - rect.height / 2) / rect.height) * 35; // scale adjusted to limit the movement up to 200px
      moveY = Math.max(Math.min(moveY, 70), -70); // Ensures that moveY stays within -100px to +100px range

      gsap.to(content, {
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
    <Link href="/booking" passHref>
      <button className="flex justify-center items-center text-center px-8  text-nowrap relative w-60 h-20 cursor-pointer">
        <div ref={containerRef} onClick={onClick} className="absolute  cursor-pointer inset-0 flex justify-center items-center">
          <div ref={contentRef} className="absolute bg-knap-10 cursor-pointer flex justify-center items-center h-20 w-60 text-sm rounded-xl border-2 hover:border-blue-600 border-gray-500"></div>
          <div ref={hamburgerRef} className="text-bono-10 cursor-pointer absolute hover:border-blue-600 text-2xl">
            Find Billetter
          </div>
        </div>
      </button>
    </Link>
  );
};

export default FollowButton;