import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@/view/pages/Login/LoginPage";
import { getMe } from "@/services/auth";

export const Route = createFileRoute("/login-admin")({
  beforeLoad: async () => {
    try {
      const { data } = await getMe();

      if (data.role === "ADMIN") {
        throw redirect({ to: "/" });
      }

      if (data.role === "USER") {
        throw redirect({ to: "/login-admin" });
      }
    } catch {
      return;
    }
  },
  component: LoginPage,
});
