import { AuthForm } from "@/app/components/marketplace/auth-form";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <AuthForm mode="login" nextPath={params.next ?? "/dashboard"} />;
}
