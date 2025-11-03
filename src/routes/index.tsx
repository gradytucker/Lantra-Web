
import { createFileRoute, redirect } from "@tanstack/react-router";

export const loader = () => {
  throw redirect({ to: "/player" });
};

export const Route = createFileRoute("/")({
  loader,
  component: () => null,
});
