import { AuthForm } from "@/app/components/marketplace/auth-form";

type SignupPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  return <AuthForm mode="signup" nextPath={params.next ?? "/dashboard"} />;
}
