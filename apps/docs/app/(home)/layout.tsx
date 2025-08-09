import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  redirect("/docs");
  return <HomeLayout {...baseOptions}>{children}</HomeLayout>;
}
