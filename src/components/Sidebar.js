import React from "react";
import MoveLeft from "./motionAnimations/MoveLeft";
import MoveRight from "./motionAnimations/MoveRight";
import GoTo from "./motionAnimations/GoTo";
import TurnLeft from "./motionAnimations/TurnLeft";
import TurnRight from "./motionAnimations/TurnRight";
import Repeat from "./motionAnimations/Repeat";
import { useAppContext } from "./AppContext";
import Icon from "./motionAnimations/Icon";
import SayHello from "./looks/SayHello";
import Show from "./looks/Show";
import Hide from "./looks/Hide";

const Sidebar = () => {
  const { handleAddCat, handlePlay } = useAppContext();
  const spriteCard = {
    backgroundColor: "#FFA500", // Vibrant orange color
    color: "white",
    padding: "2px 5px",
    borderRadius: "2px",
    fontFamily: "Arial, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    // display: 'flex',
    // justifyContent:'center',
    // alignItems:'space-between',
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  };
  // className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold mb-5">Events</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            ...spriteCard,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
          onClick={handlePlay}
        >
          <span style={{ marginRight: "5px" }}>{"When "}</span>
          <Icon
            name="flag"
            size={15}
            className="text-green-600"
            style={{ margin: "0 5px" }}
          />
          <span style={{ marginLeft: "5px" }}>{"clicked"}</span>
        </div>

        <div style={{...spriteCard,marginBottom: "10px",}} onClick={handleAddCat}>
          {"Add new cat"}
        </div>
      </div>

      <div className="font-bold mb-5">Motion</div>
      <MoveLeft />
      <MoveRight />
      <TurnLeft />
      <TurnRight />
      <GoTo />
      <Repeat />
      <div className="font-bold mb-5">Motion</div>
      <SayHello/>
      <Show/>
      <Hide/>
    </div>
  );
};

export default Sidebar;
