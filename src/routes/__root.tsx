import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../view/layouts/RootLayout";

export const Route = createRootRoute({
	component: RootLayout,
});
