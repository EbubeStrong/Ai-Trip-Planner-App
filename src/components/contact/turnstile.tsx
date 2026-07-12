"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
}

export default function Turnstile({
  onVerify,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const onVerifyRef = useRef(onVerify);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  });

  useEffect(() => {
    if (!scriptLoaded || !window.turnstile || !containerRef.current) {
      return;
    }

    window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,

      callback: (token: string) => {
        onVerifyRef.current(token);
      },

      "expired-callback": () => {
        onVerifyRef.current("");
      },
    });
  }, [scriptLoaded]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      <div ref={containerRef} />
    </>
  );
}
