import React, { useEffect } from 'react';
import VideoPresentation from '@/components/VideoPresentation';

const Video = () => {
  useEffect(() => {
    document.title = "CreaLoconIA - Tu Presencia Digital con IA";
  }, []);

  return <VideoPresentation />;
};

export default Video;
