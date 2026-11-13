import React, { useState, useMemo } from 'react';
import { Network, Copy, Check } from 'lucide-react';

export const IpSubnetCalculator: React.FC = () => {
  const [ip, setIp] = useState<string>('');
  const [cidr, setCidr] = useState<number>(24);
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    if (!ip.trim()) return null;
    const parts = ip.split('.').map((p) => parseInt(p, 10));
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      return null;
    }

    const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | ~maskInt) >>> 0;

    const toIpStr = (intVal: number) => [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255,
    ].join('.');

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : Math.max(0, totalHosts - 2);

    const firstHost = cidr >= 31 ? toIpStr(networkInt) : toIpStr(networkInt + 1);
    const lastHost = cidr >= 31 ? toIpStr(broadcastInt) : toIpStr(broadcastInt - 1);

    return {
      networkAddress: toIpStr(networkInt),
      broadcastAddress: toIpStr(broadcastInt),
      subnetMask: toIpStr(maskInt),
      usableRange: `${firstHost} — ${lastHost}`,
      usableHosts,
      totalHosts,
    };
  }, [ip, cidr]);

  const copySummary = () => {
    if (!stats) return;
    const text = `IPv4 Subnet Calculation (${ip}/${cidr}):
Network Address: ${stats.networkAddress}
Subnet Mask: ${stats.subnetMask}
Usable Host Range: ${stats.usableRange}
Broadcast Address: ${stats.broadcastAddress}
Usable Hosts: ${stats.usableHosts.toLocaleString()}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-blue-600" /> IP & CIDR Prefix
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                IP Address
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="e.g. 192.168.1.100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subnet CIDR Prefix (/{cidr})
              </label>
              <select
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                {Array.from({ length: 33 }, (_, i) => (
                  <option key={i} value={i}>
                    /{i} ({Math.pow(2, 32 - i).toLocaleString()} addresses)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">
                Usable IPv4 Hosts
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
                {stats ? stats.usableHosts.toLocaleString() : !ip.trim() ? '—' : 'Invalid IP'}
              </div>
            </div>
            {stats && (
              <button
                onClick={copySummary}
                title="Copy Summary"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>

          {stats ? (
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">Network Address:</span>
                <span className="font-bold text-white">{stats.networkAddress}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">Subnet Mask:</span>
                <span className="font-bold text-white">{stats.subnetMask}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">Usable Range:</span>
                <span className="font-bold text-emerald-400">{stats.usableRange}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-slate-300">Broadcast Address:</span>
                <span className="font-bold text-white">{stats.broadcastAddress}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-300">Total Addresses:</span>
                <span className="font-bold text-blue-300">{stats.totalHosts.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 text-center text-slate-300 text-sm font-sans">
              Enter an IPv4 address above to inspect network boundaries, CIDR netmask, and usable host capacity.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
