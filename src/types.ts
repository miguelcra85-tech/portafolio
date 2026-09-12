import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        ar?: boolean | string;
        autoplay?: boolean | string;
        'animation-name'?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean | string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        'shadow-intensity'?: string;
        ar?: boolean | string;
        autoplay?: boolean | string;
        'animation-name'?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export type Nullable<T> = T | null;
