import React, { useRef } from "react";
import * as motion from "motion/react-client";
import BotButton from "./bot-button";

const DraggebleUi = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div className=" flex ">
      <motion.div
        ref={constraintsRef}
        className="h-screen w-screen bg-red-500 flex"
      >
        <BotButton constraintsRef={constraintsRef} />
      </motion.div>
    </motion.div>
  );
};

export default DraggebleUi;
