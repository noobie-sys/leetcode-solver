import { useState } from "react";
import * as motion from "motion/react-client";
import { Button } from "../ui/button";
import { BotIcon, MessageCircle, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { DropdownMenuSetting } from "./drop-down-setting";

const BotCard = () => {
  return (
    <div className="relative">
      <Card className="absolute bottom-[58px] -right-4 bg-black text-white w-96 border-none shadow-none p-3 gap-4">
        <CardHeader className="p-2 border-b border-gray-500/40">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Solve Leetcode
            </CardTitle>
            <DropdownMenuSetting />
          </div>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[360px]">
            <div>Hello developer</div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-1">
          <form className="flex w-full gap-1">
            <Input placeholder="Type your message..." />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

const BotButton = ({
  constraintsRef,
}: {
  constraintsRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div className="relative">
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="absolute bottom-0 right-0"
      >
        <Button
          variant="outline"
          className="p-4 bg-black hover:bg-black/80 rounded-full border-none w-12 h-12"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BotIcon className="w-8 h-8" />
        </Button>
        {isOpen && <BotCard />}
      </motion.div>
    </motion.div>
  );
};

export default BotButton;
