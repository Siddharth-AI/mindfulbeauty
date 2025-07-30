"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { getTokenFromLocalStorage } from "@/app/store/slice/authSlice";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, access_token } = useAppSelector((state) => state.auth);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = access_token || getTokenFromLocalStorage();

    // If not logged in, redirect after mount
    if (!token) {
      router.replace("/admin");
      return;
    }
    // If user role info is available, also check roles
    if (
      user &&
      user.is_admin !== true &&
      !(user.type === "salon" || user.type === "freelancer")
    ) {
      router.replace("/admin");
      return;
    }
    setAuthReady(true);
  }, [router, access_token, user]);

  if (!authReady) {
    return null; // Or add a nice <Loader/>
  }

  return <>{children}</>;
}
