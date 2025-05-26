
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  type: 'input' | 'textarea' | 'select';
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  options?: string[];
  icon: LucideIcon;
}

const FormField = ({ type, label, name, value, onChange, placeholder, options, icon: Icon }: FormFieldProps) => {
  const handleChange = (newValue: string) => {
    onChange(name, newValue);
  };

  return (
    <div className="space-y-3 group">
      <Label className="text-white text-lg font-medium flex items-center gap-3">
        <Icon className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
        {label}
      </Label>
      
      {type === 'input' && (
        <Input
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-purple-300 transition-all duration-300 py-3 text-lg"
        />
      )}
      
      {type === 'textarea' && (
        <Textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="bg-white/20 border-white/30 text-white placeholder:text-purple-200 focus:bg-white/30 focus:border-purple-300 transition-all duration-300 text-lg resize-none"
        />
      )}
      
      {type === 'select' && (
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white focus:bg-white/30 focus:border-purple-300 transition-all duration-300 py-3 text-lg">
            <SelectValue placeholder="Selecciona tu estilo" className="text-purple-200" />
          </SelectTrigger>
          <SelectContent className="bg-purple-900/95 border-purple-500/50 backdrop-blur-lg">
            {options?.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-white hover:bg-purple-700/50 focus:bg-purple-700/50 cursor-pointer"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FormField;
