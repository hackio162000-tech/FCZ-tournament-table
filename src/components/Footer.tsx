"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyberpunk-accent border-opacity-30 mt-12 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-4">
          <p className="text-cyberpunk-accent text-sm font-bold mb-2">
            Built and Developed by
          </p>
          <p className="text-cyberpunk-secondary text-base font-bold">
            🏢 SNG Corp. Pvt
          </p>
        </div>
        <div className="border-t border-cyberpunk-accent border-opacity-30 pt-4">
          <p className="text-cyberpunk-accent opacity-75 text-xs">
            © {currentYear} Copyright held by <span className="text-cyberpunk-tertiary font-bold">Nithi</span>
          </p>
          <p className="text-cyberpunk-accent opacity-50 text-xs mt-2">
            SNG Tournament Maker - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
