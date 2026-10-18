import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { meta } from "@/components/InfoPage";

export const Route = createFileRoute("/login")({
  head: () => meta("Login", "Sign in to CineVerse to sync your list."),
  component: () => <AuthForm mode="login" />,
});
