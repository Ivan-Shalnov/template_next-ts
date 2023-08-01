import { useMemo } from 'react';
import gsap from 'gsap';
export default function useGsapContext(
  scope: string | object | Element | undefined,
) {
  const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
  return ctx;
}
