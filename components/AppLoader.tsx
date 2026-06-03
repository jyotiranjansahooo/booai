"use client";

import { useState } from "react";
import BookifiedLoading from "@/app/loading";

export default function AppLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return loaded ? (
    <>{children}</>
  ) : (
    <BookifiedLoading
      duration={3500}
      onComplete={() => setLoaded(true)}
    />
  );
}