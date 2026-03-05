'use client';

import { Copy, ExternalLink } from 'lucide-react';
import { truncateAddress } from '@/lib/utils';
import { useState } from 'react';

interface WalletAddressProps {
  address: string;
  truncateChars?: number;
  showCopy?: boolean;
  showLink?: boolean;
  className?: string;
}

export default function WalletAddress({
  address,
  truncateChars = 6,
  showCopy = true,
  showLink = false,
  className,
}: WalletAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className || ''}`}>
      <code className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded text-slate-600">
        {truncateAddress(address, truncateChars)}
      </code>
      {showCopy && (
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title={copied ? '¡Copiado!' : 'Copiar dirección'}
        >
          <Copy size={14} />
        </button>
      )}
      {showLink && (
        <a
          href="#"
          className="text-stellar-500 hover:text-stellar-600 transition-colors"
          title="Ver en Stellar Explorer"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
