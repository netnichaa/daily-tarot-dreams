import { useState, useEffect } from "react";
import { CardTypeConfig, TarotCard as TarotCardType } from "@/types/tarot";
import { Lock, Sparkles } from "lucide-react";

interface TarotCardProps {
	config: CardTypeConfig;
	isRead: boolean;
	isSelected: boolean;
	onClick: () => void;
	index: number;
	revealedCard: TarotCardType;
}

export const TarotCard = ({
	config,
	isRead,
	isSelected,
	onClick,
	index,
	revealedCard,
}: TarotCardProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setMounted(true), index * 100);
		return () => clearTimeout(timer);
	}, [index]);

	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={`
        relative w-full aspect-[2/3] rounded-xl overflow-hidden
        transition-all duration-500 ease-out
        ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${isSelected ? "scale-105 z-10" : "scale-100"}
        ${isHovered ? "scale-105 -translate-y-2" : ""}
        cursor-pointer
        group
      `}
			style={{ animationDelay: `${index * 100}ms` }}
		>
			{/* Card background with gradient */}
			<div
				className={`
        absolute inset-0 card-mystical rounded-xl
        bg-gradient-to-br ${config.color}
        ${isHovered ? "glow-effect" : ""}
        transition-all duration-300
      `}
			>
				{/* Ornate border effect */}
				<div className="relative z-8 flex flex-col items-center justify-center h-full text-center">
					<img
						className="w-full h-full"
						src={
							isRead && revealedCard?.imagePath
								? revealedCard.imagePath
								: "src/assets/images/card_back.jpg"
						}
					/>
				</div>
				<div className="absolute inset-1 rounded-lg border border-primary/20 pointer-events-none" />
				<div className="absolute inset-2 rounded-lg border border-primary/10 pointer-events-none" />
			</div>

			{/* Card content */}
			{!isRead && (
				<div className="relative z-10 flex flex-col items-center justify-center h-full p-3 text-center">
					{/* Icon with glow */}
					<div
						className={`
          text-4xl mb-3 transition-all duration-300
          ${isHovered ? "scale-110 animate-float" : ""}
        `}
					>
						{config.icon}
					</div>

					{/* Mystical symbol/ornament */}
					<div className="absolute top-4 left-1/2 -translate-x-1/2">
						<Sparkles
							className={`
            w-4 h-4 text-primary/60
            ${isHovered ? "animate-glow-pulse" : ""}
          `}
						/>
					</div>

					{/* Card type label */}
					<h3 className="font-display text-sm font-semibold tracking-wider uppercase text-foreground/90">
						{config.label}
					</h3>
					<p className="font-body text-xs text-foreground/60 mt-1">Prophecy</p>

					{/* Status indicator */}
					<div className="absolute bottom-3 left-1/2 -translate-x-1/2">
						<div
							className={`
              w-2 h-2 rounded-full bg-primary
              ${isHovered ? "animate-glow-pulse shadow-[0_0_10px_hsl(var(--primary))]" : ""}
            `}
						/>
					</div>
				</div>
			)}

			{/* Hover glow effect */}
			<div
				className={`
          absolute inset-0 rounded-xl pointer-events-none
          bg-gradient-to-t from-primary/10 to-transparent
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
			/>
		</button>
	);
};
