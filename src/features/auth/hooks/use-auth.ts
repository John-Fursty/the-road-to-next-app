import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getAuth } from "../queries/get-auth";
import { User as AuthUser } from "lucia"

const useAuth = () => {
     const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getAuth();
      setUser(user);
      setFetched(true);
    }

    fetchUser()
  }, [pathname])

  return { user, isFetched };
}

export { useAuth };