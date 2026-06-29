import { Heading } from "@/components/heading";
import { AccountTabs } from "../_navigation/tabs";
import { CardCompact } from "@/components/card-compact";
import { PasswordChangeForm } from "@/features/password/components/password-change-form";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />

      <div className="flex flex-col items-center flex-1">
        <CardCompact
          title="Change password"
          description="Enter your current passwort"
          className="w-full max-w-105 fade-in-from-top"
          content={<PasswordChangeForm />}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
