import { BotIcon, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Content() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${input}". How else can I assist you?`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="p-4 bg-black rounded-full border-none w-12 h-12"
        >
          <BotIcon className="w-8 h-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0 mr-4">
        <Card className="border-0 shadow-lg">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Chat Support
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-80 px-4">
              <div className="space-y-4 py-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`flex-1 max-w-[80%] ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block px-3 py-2 rounded-lg text-sm ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-gray-100 text-gray-800 rounded-bl-sm"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-1">
            <form onSubmit={handleSendMessage} className="flex w-full gap-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
