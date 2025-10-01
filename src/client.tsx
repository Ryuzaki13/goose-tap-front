import { RouterClient } from "@tanstack/react-router/ssr/client";
import { hydrateRoot } from "react-dom/client";

import { getRouter } from "./router";

const router = getRouter();

hydrateRoot(document, <RouterClient router={router} />);
