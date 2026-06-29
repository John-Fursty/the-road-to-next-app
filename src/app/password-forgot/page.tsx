import { CardCompact } from "@/components/card-compact";
import { PasswordForgotForm } from "@/features/password/components/password-forgot-form";

const PasswordForgotPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center flex-1">
        <CardCompact
          title="Forgot password"
          description="Enter your email address to reset your password"
          className="w-full max-w-105 fade-in-from-top"
          content={<PasswordForgotForm />}
        />
      </div>
    </>
  );
};

export default PasswordForgotPage;
