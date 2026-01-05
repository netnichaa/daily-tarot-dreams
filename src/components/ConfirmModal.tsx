import { Coins, Sparkles, X } from 'lucide-react';
import { CardTypeConfig, READING_COST } from '@/types/tarot';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cardType: CardTypeConfig | null;
  currentCoins: number;
}

export const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  cardType, 
  currentCoins 
}: ConfirmModalProps) => {
  if (!isOpen || !cardType) return null;

  const canAfford = currentCoins >= READING_COST;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-mystic-deep/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-xs card-mystical rounded-2xl p-6 animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-foreground/40 hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center
            bg-gradient-to-br ${cardType.color}
            animate-glow-pulse
          `}>
            <span className="text-3xl">{cardType.icon}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl font-semibold text-center text-foreground mb-2">
          {cardType.label} Prophecy
        </h2>
        
        <p className="font-body text-sm text-center text-muted-foreground mb-6">
          Reveal your {cardType.label.toLowerCase()} destiny for today
        </p>

        {/* Cost display */}
        <div className="flex items-center justify-center gap-3 mb-6 p-3 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            <span className="font-display text-lg font-semibold gold-text">
              {READING_COST}
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="font-body text-sm text-muted-foreground">
            coins required
          </span>
        </div>

        {/* Balance warning if can't afford */}
        {!canAfford && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="font-body text-sm text-center text-destructive">
              Not enough coins! Watch an ad to earn more.
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl
                       bg-muted/50 text-foreground/70 font-display
                       hover:bg-muted hover:text-foreground
                       transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford}
            className={`
              flex-1 py-2.5 rounded-xl font-display font-semibold
              transition-all duration-300
              ${canAfford
                ? 'bg-gradient-to-r from-primary/80 to-mystic-gold/80 text-primary-foreground hover:from-primary hover:to-mystic-gold shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
                : 'bg-muted/30 text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            Reveal
          </button>
        </div>
      </div>
    </div>
  );
};
