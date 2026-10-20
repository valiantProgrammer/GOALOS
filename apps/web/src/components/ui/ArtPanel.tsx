import React from "react";
import { PosterPanel, PosterPanelProps } from "./PosterPanel";

export interface ArtPanelProps extends PosterPanelProps {
  artUrl?: string;
}

export const ArtPanel: React.FC<ArtPanelProps> = ({
  quote = "DISCIPLINE CREATES FREEDOM",
  subquote = "A STRONGER YOU BUILDS A BRIGHTER TOMORROW",
  variant = "castle",
  className,
  children,
}) => {
  return (
    <PosterPanel
      variant={variant}
      quote={quote}
      subquote={subquote}
      className={className}
    >
      {children}
    </PosterPanel>
  );
};
