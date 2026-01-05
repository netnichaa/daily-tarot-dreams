import backgroundVideo from '@/assets/background.mp4';

export const VideoBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-1/2 -translate-x-1/2 w-auto h-full min-w-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/95" />
    </div>
  );
};
