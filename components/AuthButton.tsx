"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <Button disabled className="px-3 py-1">
        Laddar...
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-gray-600">
          Hej, {session.user?.name || session.user?.email}
        </span>
        <Button
          onClick={handleSignOut}
          disabled={loading}
          className="px-3 py-1"
          aria-label="Logga ut"
        >
          {loading ? "Loggar ut..." : "Logga ut"}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={loading}
      className="px-3 py-1"
      aria-label="Logga in med Google"
    >
      {loading ? "Loggar in..." : "Logga in"}
    </Button>
  );
}