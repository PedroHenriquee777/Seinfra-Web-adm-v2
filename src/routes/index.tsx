import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "../view/pages/Home/HomePage";

export const Route = createFileRoute("/")({
  component: HomePage,
});
