type DisplaySettings = {
  theme: 'light' | 'dark' | 'warm' | 'cool';
  primaryColor: string;
  accentColor: string;
  fontSize: 'standard' | 'large';
} | undefined;

export function applyDisplaySettings(display: DisplaySettings) {
  if (!display) return;
  document.documentElement.setAttribute('data-theme', display.theme);
  document.documentElement.style.setProperty('--primary', display.primaryColor);
  document.documentElement.style.setProperty('--accent', display.accentColor);
  document.documentElement.setAttribute('data-font-size', display.fontSize);
}


