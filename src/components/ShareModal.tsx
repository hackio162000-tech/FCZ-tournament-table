"use client";

import { useTournamentStore } from "@/store/tournament";
import { useState } from "react";
import QRCode from "qrcode.react";

export default function ShareModal() {
  const { currentTournament, exportData } = useTournamentStore();
  const [showModal, setShowModal] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!currentTournament) return null;

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}?tournament=${currentTournament.shareCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadData = () => {
    const data = exportData();
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/json;charset=utf-8," + encodeURIComponent(data)
    );
    element.setAttribute(
      "download",
      `tournament-${currentTournament.name}-${new Date().toISOString().slice(0, 10)}.json`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!showModal) {
    return (
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 btn-neon-primary"
        title="Open share options"
      >
        📤 Share
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card-cyberpunk w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="neon-text text-lg">Share Tournament</h3>
          <button
            onClick={() => {
              setShowModal(false);
              setShowQR(false);
            }}
            className="text-cyberpunk-accent hover:text-cyberpunk-accentDim text-2xl"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Copy Link */}
          <div>
            <p className="text-sm text-cyberpunk-accent mb-2">Share Link:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 text-xs"
              />
              <button onClick={handleCopyLink} className="btn-neon text-xs">
                {copied ? "✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div>
            <button
              onClick={() => setShowQR(!showQR)}
              className="btn-neon-primary w-full text-sm"
            >
              {showQR ? "Hide QR Code" : "Show QR Code"}
            </button>
            {showQR && (
              <div className="mt-3 flex justify-center p-3 bg-cyberpunk-dark rounded-lg">
                <QRCode value={shareUrl} size={200} bgColor="#0a0e27" fgColor="#00ff88" />
              </div>
            )}
          </div>

          {/* Export Data */}
          <button onClick={handleDownloadData} className="btn-neon w-full text-sm">
            📥 Export Tournament Data
          </button>

          {/* Close Button */}
          <button
            onClick={() => {
              setShowModal(false);
              setShowQR(false);
            }}
            className="btn-neon-primary w-full text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
