"use client";

import { VoiceSelectorProps } from "@/app/types";

const VOICES = [
  { id: "dave", name: "Dave", gender: "male", nationality: "British (Essex)", description: "Young, casual & conversational" },
  { id: "daniel", name: "Daniel", gender: "male", nationality: "British", description: "Middle-aged, authoritative but warm" },
  { id: "chris", name: "Chris", gender: "male", nationality: "American", description: "Casual & easy-going" },
  { id: "rachel", name: "Rachel", gender: "female", nationality: "American", description: "Young, calm & clear" },
  { id: "sarah", name: "Sarah", gender: "female", nationality: "American", description: "Soft, approachable" },
];

const VoiceSelector = ({ disabled, className, value, onChange }: VoiceSelectorProps) => {
  const renderOption = (voice: typeof VOICES[number]) => {
    const checked = value === voice.id;
    return (
      <label
        key={voice.id}
        className={`flex flex-col items-center justify-center w-40 h-40 rounded-lg border p-4 text-center cursor-pointer transition-all shadow-sm ${
          checked ? 'border-[#663820] bg-[#fff7f0] scale-105' : 'border-slate-200 bg-white'
        } ${className ?? ''}`}
      >
        <input
          type="radio"
          name="voice"
          checked={checked}
          onChange={() => onChange(voice.id)}
          disabled={disabled}
          className="sr-only"
        />
        <div className="font-medium text-base">{voice.name}</div>
        <div className="text-xs text-gray-500">{voice.nationality}</div>
        <div className="text-xs text-gray-400 mt-2">{voice.description}</div>
      </label>
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-semibold mb-2">Male</div>
          <div className="flex items-center justify-center gap-3">{VOICES.filter((v) => v.gender === 'male').map(renderOption)}</div>
      </div>

      <div>
        <div className="text-sm font-semibold mb-2">Female</div>
          <div className="flex items-center justify-center gap-3">{VOICES.filter((v) => v.gender === 'female').map(renderOption)}</div>
      </div>
    </div>
  );
};

export default VoiceSelector;
