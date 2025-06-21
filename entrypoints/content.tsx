import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./popup/style.css";
import BotButton from "./popup/components/bot-button";
import DraggebleUi from "./popup/components/draggable-ui";

export default defineContentScript({
  matches: ["*://leetcode.com/problems/*"],
  main() {
    const root = document.createElement("div");
    root.id = "__leetcode_helper_container";
    document.body.append(root);

    createRoot(root).render(
      <StrictMode>
        <DraggebleUi />
      </StrictMode>
    );
  },
});
