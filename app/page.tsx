import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  router.push('/dashboard')
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <h1 className="text-6xl font-semibold text-black drop-shadow-md">
        Auth
      </h1>
      <LoginButton mode="redirect" >
        <Button variant='secondary' size='lg'>
          Sign in
        </Button>
      </LoginButton>
    </div>
  );
}
