import "@testing-library/jest-dom/vitest";

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  writable: true,
  value: () =>
    (({
      beginPath: () => undefined,
      clearRect: () => undefined,
      createLinearGradient: () => ({
        addColorStop: () => undefined,
      }),
      fillRect: () => undefined,
      lineTo: () => undefined,
      moveTo: () => undefined,
      restore: () => undefined,
      save: () => undefined,
      stroke: () => undefined,
      set fillStyle(_value: string | CanvasGradient | CanvasPattern) {
        return;
      },
      set globalAlpha(_value: number) {
        return;
      },
      set lineWidth(_value: number) {
        return;
      },
      set shadowBlur(_value: number) {
        return;
      },
      set shadowColor(_value: string) {
        return;
      },
      set strokeStyle(_value: string | CanvasGradient | CanvasPattern) {
        return;
      },
    }) as unknown) as CanvasRenderingContext2D,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }),
});
