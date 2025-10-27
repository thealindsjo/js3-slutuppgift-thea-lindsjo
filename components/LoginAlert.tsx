"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";

export default function LoginAlert() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const loginRequired = searchParams.get("loginRequired");
  const attemptedPath = searchParams.get("attempted");

  useEffect(() => {
    if (loginRequired === "true") {
      setShow(true);
    }
  }, [loginRequired]);

  const handleClose = () => {
    setShow(false);
    // Ta bort query params från URL
    const url = new URL(window.location.href);
    url.searchParams.delete("loginRequired");
    url.searchParams.delete("attempted");
    router.replace(url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : ""));
  };

  if (!show) return null;

  return (
    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg" role="alert">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">
            Inloggning krävs
          </h3>
          <p className="text-yellow-700 mb-3">
            Du måste logga in för att visa detaljerad information om länder.
          </p>
          <div className="flex gap-2">
            <AuthButton />
            <Button 
              onClick={handleClose} 
              variant="outline" 
              size="sm"
              className="text-yellow-800 border-yellow-300"
            >
              Stäng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}