import React from 'react';
import MoveLeft from './motionAnimations/MoveLeft';
import MoveRight from './motionAnimations/MoveRight';
import GoTo from './motionAnimations/GoTo';
import TurnLeft from './motionAnimations/TurnLeft';
import TurnRight from './motionAnimations/TurnRight';
import Repeat from './motionAnimations/Repeat';

const Sidebar = () => {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold mb-5">Motion</div>
      <MoveLeft/>
      <MoveRight/>
      <TurnLeft/>
      <TurnRight/>
      <GoTo/>
      <Repeat/>
    </div>
  );
};

export default Sidebar;