export default function BackgroundVideo() {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      autoPlay
      loop
      muted
      playsInline
    >
      <source
        src="/videos/videoBg-lg.mp4"
        type="video/mp4"
        media="(min-width: 1200px)"
      />
      <source
        src="/videos/videoBg-md.mp4"
        type="video/mp4"
        media="(min-width: 768px)"
      />
      <source
        src="/videos/videoBg-sm.mp4"
        type="video/mp4"
        media="(max-width: 767px)"
      />
      Your browser does not support the video tag.
    </video>
  );
}

//   <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
