import "./DripingCheese.css";
import { useEffect, useRef } from "react";

function DripingCheese()
{
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.classList.add('filtered');
        }
    }, []);

    return (
        <>
            <div className="cont" ref={containerRef}>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>
                <div className="drip"></div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
                </svg>
            </div>
        </>
    )
}

export default DripingCheese;