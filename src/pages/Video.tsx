import VideoPresentation from '@/components/VideoPresentation';
import SeoHead from '@/components/SeoHead';

const Video = () => {
  return (
    <>
      <SeoHead
        title="Tu Presencia Digital con IA | CrealoconIA"
        description="Mira en 90 segundos cómo CrealoconIA crea tu sitio web profesional con inteligencia artificial en 24 horas."
        path="/video"
      />
      <VideoPresentation />
    </>
  );
};

export default Video;
