import { useState, useEffect } from 'react';
import { Coins, Play, CheckCircle } from 'lucide-react';
import { AD_REWARD } from '@/types/tarot';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const AdModal = ({ isOpen, onClose, onComplete }: AdModalProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsComplete(false);
      return;
    }

    // Simulate ad watching (5 seconds)
    const duration = 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCollect = () => {
    onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - no click to close during ad */}
      <div className="absolute inset-0 bg-mystic-deep/95 backdrop-blur-md" />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-xs card-mystical rounded-2xl p-6 animate-scale-in">
        {isComplete ? (
          <>
            {/* Success state */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary/20 animate-glow-pulse">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <h2 className="font-display text-xl font-semibold text-center text-foreground mb-2">
              Reward Earned!
            </h2>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Coins className="w-6 h-6 text-primary animate-coin-spin" />
              <span className="font-display text-2xl font-bold gold-text">
                +{AD_REWARD}
              </span>
            </div>
            
            <button
              onClick={handleCollect}
              className="w-full py-3 rounded-xl
                         bg-gradient-to-r from-primary/80 to-mystic-gold/80
                         text-primary-foreground font-display font-semibold
                         hover:from-primary hover:to-mystic-gold
                         transition-all duration-300
                         shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
            >
              Collect Coins
            </button>
          </>
        ) : (
          <>
            {/* Watching state */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary/50 relative">
                <Play className="w-10 h-10 text-foreground/80 ml-1" />
                {/* Circular progress */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="4"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                    className="transition-all duration-100"
                  />
                </svg>
              </div>
            </div>
            
            <h2 className="font-display text-lg font-semibold text-center text-foreground mb-2">
              Watching Ad...
            </h2>
            
            <p className="font-body text-sm text-center text-muted-foreground mb-4">
              Please wait to earn your coins
            </p>
            
            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-muted/30 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-primary to-mystic-gold transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <p className="font-display text-xs text-center text-muted-foreground mt-2">
              {Math.ceil((100 - progress) / 20)}s remaining
            </p>
          </>
        )}
      </div>
    </div>
  );
};
