import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginPage } from "@/view/pages/Login/LoginPage";
import { getMe } from "@/services/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    try {
      const { data } = await getMe();

      if (data.role === "ADMIN") {
        throw redirect({ to: "/" });
      }
      return;
    } catch {
      return;
    }
  },
  component: LoginPage,
});
