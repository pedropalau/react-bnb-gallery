import React from 'react';
import { GlassMagnifier } from 'react-image-magnifiers';

export default function Image({ onLoad, src, alt, className, style }) {
  return (
    <div className={className} style={style}>
      <GlassMagnifier
        allowOverflow
        imageSrc={src}
        imageAlt={alt}
        onImageLoad={onLoad}
      />
    </div>
  );
}
