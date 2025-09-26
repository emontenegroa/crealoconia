import React from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
interface StickyMobileCTAProps {
  isVisible: boolean;
  onClick: () => void;
}
const StickyMobileCTA = ({
  isVisible,
  onClick
}: StickyMobileCTAProps) => {
  if (!isVisible) return null;
  return;
};
export default StickyMobileCTA;