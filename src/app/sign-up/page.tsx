import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";
import Link from "next/link";

const SignUpPage = () => {
    return <>
     <div className="flex flex-col justify-center items-center flex-1">
        <CardCompact title="Sign Up" description="Create account to get started" className="w-full max-w-105 fade-in-from-top" content={<SignUpForm />} footer={<Link className="text-sm text-muted-foreground" href={signInPath()}>Have an account? Sign In now.</Link>}/>
    </div>
    </>;
}

export default SignUpPage;