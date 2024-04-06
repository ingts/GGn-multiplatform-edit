import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Providers } from "./providers";

export default (function () {
  const rootNode = document.createElement("div");
  rootNode.setAttribute("id", "GGn-multiplatform-edit");

  const groupCoverNode = document.querySelector("#group_cover");
  if (!groupCoverNode) {
    throw new Error("Group Cover not found. The markup might have changed.");
  }

  groupCoverNode.insertAdjacentElement("afterend", rootNode);

  createRoot(rootNode).render(
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>,
  );
})();
