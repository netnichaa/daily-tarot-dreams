export type ProphecyType = "daily" | "love" | "work" | "health";

export interface LocalizedText {
	TH: string;
	EN: string;
	JP: string;
}

export interface ProphecyData {
	value: number;
	prophecy: LocalizedText;
}

export interface TarotCard {
	arcanaName: string;
	id: number;
	imagePath: string;
	name: LocalizedText;
	daily: ProphecyData;
	love: ProphecyData;
	work: ProphecyData;
	health: ProphecyData;
}

export interface TarotData {
	data: TarotCard[];
}

export interface CardTypeConfig {
	type: ProphecyType;
	label: string;
	icon: string;
	color: string;
	glowColor: string;
}

export const CARD_TYPES: CardTypeConfig[] = [
	{
		type: "daily",
		label: "Daily",
		icon: "☀️",
		color: "from-amber-500/20 to-orange-600/20",
		glowColor: "shadow-amber-500/30",
	},
	{
		type: "love",
		label: "Love",
		icon: "💕",
		color: "from-rose-500/20 to-pink-600/20",
		glowColor: "shadow-rose-500/30",
	},
	{
		type: "work",
		label: "Work",
		icon: "💼",
		color: "from-blue-500/20 to-indigo-600/20",
		glowColor: "shadow-blue-500/30",
	},
	{
		type: "health",
		label: "Health",
		icon: "🌿",
		color: "from-emerald-500/20 to-teal-600/20",
		glowColor: "shadow-emerald-500/30",
	},
];

export const READING_COST = 10;
export const AD_REWARD = 10;
