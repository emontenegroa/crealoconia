import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useStepNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Estados del formulario
  const [showFullForm, setShowFullForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(0);
  
  // Leer el paso actual desde la URL
  const getCurrentStep = (): number => {
    const params = new URLSearchParams(location.search);
    const step = params.get('step');
    return step ? parseInt(step, 10) : 1;
  };
  
  // Actualizar la URL con el paso actual y hacer scroll al inicio
  const updateStepInURL = (step: number) => {
    const params = new URLSearchParams(location.search);
    params.set('step', step.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Scroll suave al inicio de la página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  // Inicializar estado basado en la URL y hacer scroll al inicio
  useEffect(() => {
    const currentStep = getCurrentStep();
    
    if (currentStep === 1) {
      // Paso 1: Formulario inicial
      setShowFullForm(false);
      setShowResults(false);
      setCurrentWizardStep(0);
    } else if (currentStep === 2) {
      // Paso 2: Formulario completo paso 1
      setShowFullForm(true);
      setShowResults(false);
      setCurrentWizardStep(0);
    } else if (currentStep === 3) {
      // Paso 3: Formulario completo paso 2
      setShowFullForm(true);
      setShowResults(false);
      setCurrentWizardStep(1);
    } else if (currentStep === 4) {
      // Paso 4: Formulario completo paso 3
      setShowFullForm(true);
      setShowResults(false);
      setCurrentWizardStep(2);
    } else if (currentStep === 5) {
      // Paso 5: Resultados/Felicidades
      setShowFullForm(true);
      setShowResults(true);
      setCurrentWizardStep(3);
    }
    
    // Scroll al inicio cuando cambia el paso desde la URL
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.search]);
  
  // Funciones para navegar entre pasos
  const goToInitialForm = () => {
    updateStepInURL(1);
  };
  
  const goToFullForm = () => {
    updateStepInURL(2);
  };
  
  const goToWizardStep = (step: number) => {
    // step 0 -> URL step 2
    // step 1 -> URL step 3  
    // step 2 -> URL step 4
    updateStepInURL(step + 2);
  };
  
  const goToResults = () => {
    updateStepInURL(5);
  };
  
  return {
    // Estados
    showFullForm,
    showResults,
    currentWizardStep,
    currentURLStep: getCurrentStep(),
    
    // Setters para casos especiales
    setShowFullForm,
    setShowResults,
    setCurrentWizardStep,
    
    // Navegación
    goToInitialForm,
    goToFullForm,
    goToWizardStep,
    goToResults,
    updateStepInURL
  };
};