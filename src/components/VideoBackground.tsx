import backgroundVideo from "@/assets/background.mp4";
import { useIsMobile } from "@/hooks/use-mobile";

export const VideoBackground = () => {
	const isMobile = useIsMobile();

	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none">
			<video
				autoPlay
				loop
				muted
				playsInline
				className={`absolute ${
					isMobile ? "top-0 w-full h-auto" : "bottom-0 w-full h-auto"
				} min-w-full object-cover`}
			>
				<source src={backgroundVideo} type="video/mp4" />
			</video>
			{/* Gradient overlay for better text readability */}
			<div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/95" />
		</div>
	);
};
