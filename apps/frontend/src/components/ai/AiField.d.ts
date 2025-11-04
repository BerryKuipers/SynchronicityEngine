import React from 'react';
import './AiField.css';
type AiFieldProps = {
    id: string;
    kind: 'short_text' | 'long_text' | 'json' | 'title' | 'tags';
    purpose: string;
    value: string;
    onChange: (value: string) => void;
    layer: string;
    lawVersion?: string;
    personaVersion?: string;
    beliefs?: object;
    world?: object;
    blueprint?: object;
    extraContext?: object;
};
export declare const AiField: React.FC<AiFieldProps>;
export {};
