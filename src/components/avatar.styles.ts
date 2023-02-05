import React, { useContext } from "react";
import { AvatarContext, AvatarSize } from "./avatar-context";

const wrapperDefaultStyle: React.CSSProperties = {
  display: "inline-block",
  position: "relative",
  lineHeight: 0,
  flexShrink: 0,
  aspectRatio: "1 / 1",
  width: "18px",
  height: "18px",
  fontSize: "9px",
};

const imageDefaultStyle: React.CSSProperties = {
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  pointerEvents: "none",
};

const avatarWrapperSizes = {
  sm: {
    width: "18px",
    height: "18px",
    fontSize: "9px",
  },
  md: {
    width: "24px",
    height: "24px",
    fontSize: "12px",
  },
  lg: {
    width: "32px",
    height: "32px",
    fontSize: "16px",
  },
  xl: {
    width: "48px",
    height: "48px",
    fontSize: "24px",
  },
  "2xl": {
    width: "64px",
    height: "64px",
    fontSize: "32px",
  },
  "3xl": {
    width: "96px",
    height: "96px",
    fontSize: "48px",
  },
  "4xl": {
    width: "128px",
    height: "128px",
    fontSize: "64px",
  },
  "5xl": {
    width: "256px",
    height: "256px",
    fontSize: "128px",
  },
};

export const useAvatarStyles = (size: AvatarSize) => {
  const { customStyles } = useContext(AvatarContext);

  const wrapperStyle = {
    ...wrapperDefaultStyle,
    ...customStyles.avatarWrapper,
    ...avatarWrapperSizes[size],
    ...customStyles[`avatarImage[${size}]`],
  };

  const imageStyle = {
    ...imageDefaultStyle,
    ...customStyles.avatarImage,
  };

  return { wrapperStyle, imageStyle };
};
