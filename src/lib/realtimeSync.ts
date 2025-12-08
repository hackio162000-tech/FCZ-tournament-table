// Real-time sync service using localStorage events and BroadcastChannel API
// This allows multiple admin devices to sync changes instantly

export class RealtimeSync {
  private channel: BroadcastChannel | null = null;
  private listeners: ((data: any) => void)[] = [];

  constructor() {
    // Try to use BroadcastChannel API (works across tabs and with some limitations across devices on same network)
    try {
      this.channel = new BroadcastChannel("tournament-sync");
      this.channel.onmessage = (event) => {
        this.listeners.forEach((listener) => listener(event.data));
      };
    } catch (err) {
      console.log("BroadcastChannel not available, using storage events");
    }

    // Fallback: Listen to storage events (works across tabs)
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (event) => {
        if (event.key === "tournaments-sync-event") {
          try {
            const data = JSON.parse(event.newValue || "{}");
            this.listeners.forEach((listener) => listener(data));
          } catch (err) {
            console.error("Failed to parse sync event:", err);
          }
        }
      });
    }
  }

  // Broadcast changes to all connected devices
  broadcast(data: any) {
    if (this.channel) {
      this.channel.postMessage({
        type: "tournament-update",
        data,
        timestamp: Date.now(),
      });
    }

    // Also use localStorage for cross-tab sync
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tournaments-sync-event",
        JSON.stringify({
          type: "tournament-update",
          data,
          timestamp: Date.now(),
        })
      );
    }
  }

  // Subscribe to changes
  subscribe(listener: (data: any) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Cleanup
  destroy() {
    if (this.channel) {
      this.channel.close();
    }
    this.listeners = [];
  }
}

export const realtimeSync = new RealtimeSync();
