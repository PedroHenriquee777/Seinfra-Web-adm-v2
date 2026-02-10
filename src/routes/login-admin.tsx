import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/view/pages/Login/LoginPage";

export const Route = createFileRoute("/login-admin")({
  component: LoginPage,
});
