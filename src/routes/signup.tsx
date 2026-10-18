import { createFileRoute } from "@tanstack/react-router";
import { AuthForm } from "@/components/AuthForm";
import { meta } from "@/components/InfoPage";

export const Route = createFileRoute("/signup")({
  head: () => meta("Sign Up", "Create a CineVerse account."),
  component: () => <AuthForm mode="signup" />,
});
