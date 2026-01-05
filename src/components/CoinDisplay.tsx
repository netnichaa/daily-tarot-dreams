import { Coins } from 'lucide-react';

interface CoinDisplayProps {
  coins: number;
  onWatchAd: () => void;
  isWatchingAd: boolean;
}

export const CoinDisplay = ({ coins, onWatchAd, isWatchingAd }: CoinDisplayProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
      <button
        onClick={onWatchAd}
        disabled={isWatchingAd}
        className="px-3 py-1.5 rounded-full bg-secondary/80 backdrop-blur-sm 
                   border border-primary/30 text-sm font-display text-primary
                   hover:bg-secondary hover:border-primary/50 transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
      >
        {isWatchingAd ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            Watching...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span>▶️</span>
            +10
          </span>
        )}
      </button>
      
      <div className="coin-display flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm">
        <Coins className="w-5 h-5 text-primary animate-glow-pulse" />
        <span className="font-display text-lg font-semibold gold-text">
          {coins}
        </span>
      </div>
    </div>
  );
};
