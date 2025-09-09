declare module "@/lib/utils";
interface TawkAPI {
  maximize: () => void;
  minimize: () => void;
  hideWidget: () => void;
  showWidget: () => void;
  setAttributes: (
    attributes: Record<string, unknown>,
    callback: (error: Error | null) => void
  ) => void;
  onChatStarted?: () => void;
  onChatEnded?: () => void;
  onStatusChange?: (status: string) => void;
  onLoad?: () => void;
}

declare global {
  interface Window {
    Tawk_API?: TawkAPI;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}

export {};
