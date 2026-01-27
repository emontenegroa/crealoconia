import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
  disabled?: boolean;
  className?: string;
}

// Extend window interface for Speech Recognition
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

const VoiceRecorder = ({ onTranscription, disabled = false, className = '' }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcriptBuffer, setTranscriptBuffer] = useState('');
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if speech recognition is supported
  const isSpeechRecognitionSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    if (!isSpeechRecognitionSupported()) {
      toast.error('Tu navegador no soporta reconocimiento de voz. Intenta con Chrome o Edge.');
      return;
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Initialize speech recognition
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'es-ES';
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let finalTranscript = '';
      let interimTranscript = '';

      recognition.onstart = () => {
        setIsRecording(true);
        setTranscriptBuffer('');
        toast.info('🎙️ Grabando... Habla ahora', { duration: 2000 });
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update buffer with current transcription (final + interim)
        setTranscriptBuffer(finalTranscript + interimTranscript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        setIsProcessing(false);
        
        switch (event.error) {
          case 'no-speech':
            toast.warning('No se detectó voz. Intenta de nuevo.');
            break;
          case 'audio-capture':
            toast.error('No se pudo acceder al micrófono.');
            break;
          case 'not-allowed':
            toast.error('Permiso de micrófono denegado. Habilítalo en la configuración del navegador.');
            break;
          case 'network':
            toast.error('Error de red. Verifica tu conexión a internet.');
            break;
          default:
            toast.error('Error en el reconocimiento de voz.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        
        if (finalTranscript.trim()) {
          setIsProcessing(true);
          // Small delay to show processing state
          setTimeout(() => {
            onTranscription(finalTranscript.trim());
            setIsProcessing(false);
            toast.success('✅ Transcripción completada');
          }, 300);
        } else if (interimTranscript.trim()) {
          // If we only have interim results, use those
          setIsProcessing(true);
          setTimeout(() => {
            onTranscription(interimTranscript.trim());
            setIsProcessing(false);
            toast.success('✅ Transcripción completada');
          }, 300);
        }
        
        setTranscriptBuffer('');
      };

      recognitionRef.current = recognition;
      recognition.start();

      // Auto-stop after 60 seconds
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          toast.info('Grabación detenida (límite de 60 segundos)');
        }
      }, 60000);

    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('No se pudo iniciar la grabación. Verifica los permisos del micrófono.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (!isSpeechRecognitionSupported()) {
    return null; // Don't render if not supported
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        type="button"
        onClick={handleClick}
        disabled={disabled || isProcessing}
        variant="outline"
        size="sm"
        className={`
          transition-all duration-300
          ${isRecording 
            ? 'bg-red-500/30 border-red-400 text-red-200 hover:bg-red-500/40 hover:text-red-100 animate-pulse' 
            : 'bg-white/10 border-white/20 text-white hover:text-white hover:bg-white/20'
          }
        `}
        title={isRecording ? 'Detener grabación' : 'Grabar voz'}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
            <span className="hidden sm:inline ml-1">Procesando...</span>
          </>
        ) : isRecording ? (
          <>
            <MicOff className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline ml-1">Detener</span>
          </>
        ) : (
          <>
            <Mic className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline ml-1">Voz</span>
          </>
        )}
      </Button>
      
      {/* Live transcription preview */}
      {isRecording && transcriptBuffer && (
        <div className="text-xs text-white/70 italic max-w-[200px] truncate">
          "{transcriptBuffer}"
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
