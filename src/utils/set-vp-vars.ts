import { debounce } from 'lodash';
export function setVPVars(): void {
  const vpWidth = window.innerWidth;
  const vpHeight = window.innerHeight;
  const vw = vpWidth / 100;
  const vh = vpHeight / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
export function setVPVarsListener(): () => void {
  let lastVPWidth = window.innerWidth;
  const resizeHandlerDebounced = debounce(() => {
    const vpWidth = window.innerWidth;
    if (vpWidth !== lastVPWidth) {
      setVPVars();
      lastVPWidth = vpWidth;
    }
  }, 100);
  window.addEventListener('resize', resizeHandlerDebounced);
  return () => {
    window.removeEventListener('resize', resizeHandlerDebounced);
  };
}
