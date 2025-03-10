"use client";

import { useRouter } from "next/navigation";

export default function DelayedNavigation() {
  const router = useRouter();

  const handleNavigation = () => {
    setTimeout(() => {
      router.push("/new-page");
    }, 1000); // 1s delay before navigating
  };

  return <button onClick={handleNavigation}>Go to New Page</button>;
}
