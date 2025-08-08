export async function setBrightness(level: number) {
  try {
    const clamped = Math.max(0, Math.min(100, Math.round(level)));
    const anyWindow = window as any;
    if (anyWindow && typeof anyWindow.nativeBrightness?.set === 'function') {
      anyWindow.nativeBrightness.set(clamped);
    } else {
      document.documentElement.style.setProperty('--app-brightness', `${clamped}%`);
    }
  } catch (err) {
    console.error('Brightness control failed', err);
  }
}


