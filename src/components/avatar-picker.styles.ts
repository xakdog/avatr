import React from "react";
import { useContext } from "react";
import { AvatarContext } from "./avatar-context";

const hoverContentDefaultStyle: React.CSSProperties = {
  cursor: "pointer",
  left: 0,
  top: 0,
  position: "absolute",
  height: "100%",
  width: "100%",
  borderRadius: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const cameraIconDefaultStyle: React.CSSProperties = {
  position: "absolute",
  margin: "auto",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  color: "white",
  opacity: 0.8,
};

export const useAvatarPickerStyles = () => {
  const { customStyles } = useContext(AvatarContext);

  const hoverContentStyle = {
    ...hoverContentDefaultStyle,
    ...customStyles?.pickerHoverContent,
  };

  const cameraIconStyle = {
    ...cameraIconDefaultStyle,
    ...customStyles?.pickerCameraIcon,
  };

  return { hoverContentStyle, cameraIconStyle };
};
