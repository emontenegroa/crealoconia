import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Badge } from './badge';
import { X, Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

const TAG_COLORS = [
  '#10b981', '#f59e0b', '#ef4444', '#22c55e', '#dc2626', '#f97316',
  '#3b82f6', '#8b5cf6', '#06b6d4', '#84cc16', '#f43f5e', '#6366f1'
];

export function TagInput({ value, onChange, placeholder = "Buscar o crear tags...", className }: TagInputProps) {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    const filtered = allTags.filter(tag => 
      tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(tag.name)
    );
    setFilteredTags(filtered);
  }, [inputValue, allTags, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setAllTags(data || []);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  const createTag = async (name: string) => {
    const color = TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];
    
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert({ name, color })
        .select()
        .single();
      
      if (error) throw error;
      
      setAllTags(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error creating tag:', error);
      return null;
    }
  };

  const handleAddTag = async (tagName: string) => {
    const trimmedName = tagName.trim();
    if (!trimmedName || value.includes(trimmedName)) return;

    let existingTag = allTags.find(tag => tag.name.toLowerCase() === trimmedName.toLowerCase());
    
    if (!existingTag) {
      existingTag = await createTag(trimmedName);
      if (!existingTag) return;
    }

    onChange([...value, existingTag.name]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      handleRemoveTag(value[value.length - 1]);
    }
  };

  const getTagColor = (tagName: string) => {
    const tag = allTags.find(t => t.name === tagName);
    return tag?.color || '#3b82f6';
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background min-h-[42px] focus-within:ring-2 focus-within:ring-ring">
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
            style={{ backgroundColor: getTagColor(tag) + '20', color: getTagColor(tag), borderColor: getTagColor(tag) }}
          >
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 w-4 h-4 hover:bg-transparent"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
        
        <div className="flex-1 flex items-center gap-2 min-w-[120px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={value.length === 0 ? placeholder : "Agregar más tags..."}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />
        </div>
      </div>

      {showSuggestions && (inputValue || filteredTags.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
          {filteredTags.map((tag) => (
            <Button
              key={tag.id}
              variant="ghost"
              className="w-full justify-start px-3 py-2 h-auto"
              onClick={() => handleAddTag(tag.name)}
            >
              <Badge
                variant="secondary"
                className="mr-2"
                style={{ backgroundColor: tag.color + '20', color: tag.color, borderColor: tag.color }}
              >
                {tag.name}
              </Badge>
            </Button>
          ))}
          
          {inputValue && !filteredTags.some(tag => tag.name.toLowerCase() === inputValue.toLowerCase()) && (
            <Button
              variant="ghost"
              className="w-full justify-start px-3 py-2 h-auto border-t"
              onClick={() => handleAddTag(inputValue)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear "{inputValue}"
            </Button>
          )}
          
          {!inputValue && filteredTags.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Todos los tags están siendo usados
            </div>
          )}
        </div>
      )}
    </div>
  );
}