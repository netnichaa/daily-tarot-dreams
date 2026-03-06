import { useState, useEffect } from "react";
import { X, Sparkles, Star } from "lucide-react";
import { TarotCard, ProphecyType, CardTypeConfig } from "@/types/tarot";

interface ProphecyModalProps {
	isOpen: boolean;
	isRead: boolean;
	onClose: () => void;
	card: TarotCard | null;
	cardType: CardTypeConfig | null;
	prophecyType: ProphecyType | null;
}

export const ProphecyModal = ({
	isOpen,
	isRead,
	onClose,
	card,
	cardType,
	prophecyType,
}: ProphecyModalProps) => {
	const [isRevealed, setIsRevealed] = useState(false);
	const [isFlipping, setIsFlipping] = useState(false);

	useEffect(() => {
		if (isOpen && isRead && card) {
			setIsFlipping(true);
			const timer = setTimeout(() => {
				setIsRevealed(true);
				setIsFlipping(false);
			}, 300);
			return () => clearTimeout(timer);
		} else if (isOpen && card) {
			setIsFlipping(true);
			const timer = setTimeout(() => {
				setIsRevealed(true);
				setIsFlipping(false);
			}, 3000);
			return () => clearTimeout(timer);
		} else {
			setIsRevealed(false);
			setIsFlipping(false);
		}
	}, [isOpen, isRead, card]);

	if (!isOpen || !card || !prophecyType || !cardType) return null;

	const prophecyData = card[prophecyType];
	const prophecyText = prophecyData.prophecy.EN;
	const starRating = prophecyData.value;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-mystic-deep/90 backdrop-blur-md animate-fade-in-up"
				onClick={onClose}
			/>

			{/* Modal content */}
			<div className="relative z-10 w-full max-w-sm animate-scale-in">
				{/* Card container with flip animation */}
				<div className="perspective-1000">
					<div
						className={`
            relative preserve-3d transition-transform duration-600 ease-in-out
            ${isFlipping && !isRead ? "animate-multi-rotate-speedup" : ""}
            ${isRevealed ? "rotate-y-180" : ""}
			${isRead ? "animate-card-flip" : ""}
          `}
					>
						{/* Card back (showing first) */}
						<div
							className={`
              absolute inset-0 backface-hidden
              card-mystical rounded-2xl p-6
              flex flex-col items-center justify-center
              ${isRevealed ? "invisible" : "visible"}
            `}
						>
							<Sparkles className="w-16 h-16 text-primary animate-glow-pulse" />
						</div>

						{/* Card front (prophecy revealed) */}
						<div
							className={`
              relative backface-hidden rotate-y-180
              card-mystical rounded-2xl overflow-hidden
              ${isRevealed ? "visible" : "invisible"}
            `}
						>
							{/* Header with card type */}
							<div
								className={`
                p-4 text-center
                bg-gradient-to-br ${cardType.color}
                border-b border-primary/20
              `}
							>
								<div className="flex items-center justify-center gap-2 mb-2">
									<h2 className="font-display text-2xl font-semibold gold-text">
										{card.name.EN}
									</h2>
								</div>

								{/* Star rating */}
								<div className="flex items-center justify-center gap-1">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`w-4 h-4 ${
												i < starRating
													? "text-primary fill-primary"
													: "text-muted-foreground/30"
											}`}
										/>
									))}
								</div>
							</div>

							<img
								className="relative w-1/2 mx-auto pt-6"
								src={card.imagePath}
							/>

							{/* Prophecy text */}
							<div className="p-6">
								<p className="font-body text-lg leading-relaxed text-foreground/90 text-center italic">
									"{prophecyText}"
								</p>
							</div>

							{/* Footer ornament */}
							<div className="flex justify-center pb-6">
								<div className="flex items-center gap-2 text-primary/40">
									<div className="w-8 h-px bg-primary/40" />
									<Sparkles className="w-4 h-4" />
									<div className="w-8 h-px bg-primary/40" />
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Continue button */}
				{isRevealed && (
					<button
						onClick={onClose}
						className="w-full mt-6 py-3 rounded-xl
                       bg-gradient-to-r from-primary/80 to-mystic-gold/80
                       text-primary-foreground font-display font-semibold
                       hover:from-primary hover:to-mystic-gold
                       transition-all duration-300
                       shadow-[0_0_20px_hsl(var(--primary)/0.3)]
                       hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]
                       animate-fade-in-up"
					>
						Back
					</button>
				)}
			</div>
		</div>
	);
};
