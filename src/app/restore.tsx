"use client";

import { useEffect } from "react";

// Cloud restore page - currently using localStorage instead
export default function CloudRestore() {
  useEffect(() => {
    // Redirect to home
    window.location.href = "/";
  }, []);

  return null;
}
