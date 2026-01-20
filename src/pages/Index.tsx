import { useState, useMemo } from "react";
import { VideoBackground } from "@/components/VideoBackground";
import { CoinDisplay } from "@/components/CoinDisplay";
import { TarotCard } from "@/components/TarotCard";
import { ProphecyModal } from "@/components/ProphecyModal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { AdModal } from "@/components/AdModal";
import { useGameState } from "@/hooks/useLocalStorage";
import {
	CARD_TYPES,
	READING_COST,
	AD_REWARD,
	ProphecyType,
	CardTypeConfig,
	TarotCard as TarotCardType,
	TarotData,
} from "@/types/tarot";
import { Sparkles, Moon } from "lucide-react";
import { toast } from "sonner";
import tarotData from "@/data/tarotData.json";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
	const { coins, isCardRead, spendCoins, earnCoins, markCardAsRead } =
		useGameState();

	const [selectedCardType, setSelectedCardType] =
		useState<CardTypeConfig | null>(null);
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isProphecyOpen, setIsProphecyOpen] = useState(false);
	const [isAdModalOpen, setIsAdModalOpen] = useState(false);
	const [isWatchingAd, setIsWatchingAd] = useState(false);
	const [revealedCard, setRevealedCard] = useState<TarotCardType | null>(null);
	const [revealedType, setRevealedType] = useState<ProphecyType | null>(null);
	const isMobile = useIsMobile();

	const data = tarotData as TarotData;

	// Get random card for prophecy
	const getRandomCard = (): TarotCardType => {
		const randomIndex = Math.floor(Math.random() * data.data.length);
		return data.data[randomIndex];
	};

	const handleCardClick = (config: CardTypeConfig) => {
		if (isCardRead(config.type)) {
			toast.info(`You've already read your ${config.label} prophecy today`, {
				description: "Come back tomorrow for a new reading",
				icon: <Moon className="w-4 h-4" />,
			});
			return;
		}
		setSelectedCardType(config);
		setIsConfirmOpen(true);
	};

	const handleConfirmReading = () => {
		if (!selectedCardType) return;

		if (spendCoins(READING_COST)) {
			const card = getRandomCard();
			setRevealedCard(card);
			setRevealedType(selectedCardType.type);
			markCardAsRead(selectedCardType.type);
			setIsConfirmOpen(false);
			setIsProphecyOpen(true);

			toast.success("The cards reveal your destiny...", {
				icon: <Sparkles className="w-4 h-4" />,
			});
		} else {
			toast.error("Not enough coins!", {
				description: "Watch an ad to earn more coins",
			});
		}
	};

	const handleWatchAd = () => {
		setIsWatchingAd(true);
		setIsAdModalOpen(true);
	};

	const handleAdComplete = () => {
		earnCoins(AD_REWARD);
		setIsWatchingAd(false);
		toast.success(`+${AD_REWARD} coins earned!`, {
			icon: <Sparkles className="w-4 h-4" />,
		});
	};

	const handleAdClose = () => {
		setIsAdModalOpen(false);
		setIsWatchingAd(false);
	};

	const unreadCount = useMemo(() => {
		return CARD_TYPES.filter((c) => !isCardRead(c.type)).length;
	}, [isCardRead]);

	return (
		<div className="relative min-h-screen min-h-[100dvh] overflow-hidden">
			{/* Video Background */}
			<VideoBackground />

			{/* Coin Display */}
			<CoinDisplay
				coins={coins}
				onWatchAd={handleWatchAd}
				isWatchingAd={isWatchingAd}
			/>

			{/* Main Content */}
			<main className="relative z-10 flex flex-col items-center justify-start px-4 pt-20 pb-8 min-h-screen h-[100dvh]">
				{/* Header */}
				<header className="text-center mb-8 animate-fade-in-up">
					<div className="flex items-center justify-center gap-2 mb-2">
						<Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
						<h1 className="flex-1 font-display text-2xl font-bold gold-text tracking-wide">
							Daily Tarot
						</h1>
						<Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
					</div>
					<p className="font-body text-sm text-muted-foreground">
						{unreadCount > 0
							? `${unreadCount} prophecies await you today`
							: "All prophecies revealed for today"}
					</p>
				</header>

				{/* Cards Grid - 2x2 layout */}
				<div
					className={
						isMobile
							? "h-full w-[70dvw]"
							: "h-full flex items-center justify-center w-[80dvw]"
					}
				>
					<div
						className={`flex-1 grid items-center ${isMobile ? `grid-cols-2` : `grid-cols-4`} gap-8`}
					>
						{CARD_TYPES.map((config, index) => (
							<TarotCard
								key={config.type}
								config={config}
								isRead={isCardRead(config.type)}
								isSelected={selectedCardType?.type === config.type}
								onClick={() => handleCardClick(config)}
								index={index}
							/>
						))}
					</div>
				</div>

				{/* Footer info */}
				<footer
					className="mt-auto pt-8 text-center animate-fade-in-up"
					style={{ animationDelay: "500ms" }}
				>
					<p className="font-body text-xs text-muted-foreground/60">
						Cards reset at midnight
					</p>
				</footer>
			</main>

			{/* Modals */}
			<ConfirmModal
				isOpen={isConfirmOpen}
				onClose={() => setIsConfirmOpen(false)}
				onConfirm={handleConfirmReading}
				cardType={selectedCardType}
				currentCoins={coins}
			/>

			<ProphecyModal
				isOpen={isProphecyOpen}
				onClose={() => {
					setIsProphecyOpen(false);
					setRevealedCard(null);
					setRevealedType(null);
					setSelectedCardType(null);
				}}
				card={revealedCard}
				cardType={selectedCardType}
				prophecyType={revealedType}
			/>

			<AdModal
				isOpen={isAdModalOpen}
				onClose={handleAdClose}
				onComplete={handleAdComplete}
			/>
		</div>
	);
};

export default Index;
