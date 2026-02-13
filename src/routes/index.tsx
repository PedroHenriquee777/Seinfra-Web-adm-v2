import { createFileRoute, redirect } from "@tanstack/react-router";
import { HomePage } from "../view/pages/Home/HomePage";
import { getMe } from "@/services/auth";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      const { data } = await getMe();

      if (data.role !== "ADMIN") {
        throw redirect({ to: "/login-admin" });
      }

    } catch {
      throw redirect({ to: "/login-admin" });
    }
  },
  component: HomePage,
});