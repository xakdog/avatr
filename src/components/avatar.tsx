import React, { PropsWithChildren, useCallback } from "react";

import { AvatarSize } from "./avatar-context";
import { useAvatarStyles } from "./avatar.styles";

export type AvatarProps = {
  size: AvatarSize;
  userId: string;
  alt?: string;
  initials?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const RANDOM_FACE_URL = "https://api.lorem.space/image/face?w=250&h=250";

export const Avatar: React.FC<PropsWithChildren<AvatarProps>> = ({
  userId,
  size,
  alt,
  initials,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { wrapperStyle, imageStyle } = useAvatarStyles(size);
  const [failedToLoad, setFailedToLoad] = React.useState(false);

  const fallbackUrl = `https://avatars.dicebear.com/api/initials/${initials}.svg`;
  const showFallback = initials ? false : failedToLoad;
  const imageUrl = showFallback ? fallbackUrl : RANDOM_FACE_URL;

  const setFailed = useCallback(() => {
    setFailedToLoad(true);
  }, [setFailedToLoad]);

  const events = { onClick, onMouseEnter, onMouseLeave };

  return (
    <div style={wrapperStyle} {...events}>
      <img alt={alt} src={imageUrl} style={imageStyle} onError={setFailed} />
      {children}
    </div>
  );
};
