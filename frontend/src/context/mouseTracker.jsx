import { useEffect, useState } from "react"
import { useSocket } from "./socketContext"

 const MouseTracker = ({children})=>{
const [x, setX] = useState()
  const [y, setY] = useState()
  const socket = useSocket();
  useEffect(
    () => {
      const update = (e) => {
         var res;
        if (e.type === "mousemove") {
            setX(e.clientX);
            setY(e.clientY);
            res = socket.buildMouseTrackerEvent(e.clientX,e.clientY,e.type);

          } else if (e.type === "touchmove" && e.touches.length > 0) {
            setX(Math.round(e.touches[0].clientX));
            setY(Math.round(e.touches[0].clientY));
            res = socket.buildMouseTrackerEvent(Math.round(e.touches[0].clientX),Math.round(e.touches[0].clientY));

          }
          if(res)
          socket.trackEvent(res.event,res.payload);
        //console.log(e.x,e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    },
    []
  )

    return(
        <div>

        { x && y ? (<h1>{`x: ${x}; y: ${y};`}</h1>) : null}
        {children}
        </div>
    )

}

export const MouseTrackerProvider = MouseTracker; 