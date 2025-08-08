import { useState } from "react";

export interface AppConfig {
  title: string;
  version: string;
  language: string;
}

export function useConfig() {
  const [config] = useState<AppConfig>({
    title: "Dashboard",
    version: "1.0.0",
    language: "en",
  });

  return config;
}
