export function HeaderVideo() {
  return (
    <video
      width="1200"
      height="350"
      muted
      controlsOFF
      autoPlay
      loop
      preload="auto"
    >
      <source src="/images/header-web-high.mp4" type="video/mp4" />
      {/* <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      /> */}
      Your browser does not support the video tag.
    </video>
  );
}
