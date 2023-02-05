import React, { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { AvatarSize } from "./avatar-context";
import { CameraIcon } from "./icons/camera-icon";
import { useAvatarPickerStyles } from "./avatar-picker.styles";
import { useAvatarUploader } from "./avatar-picker.uploader";

export type AvatarPickerProps = {
  size: AvatarSize;
  userId: string;
  initials?: string;
};

const getRandomId = () =>
  `avatar-upload-${Math.random().toString(36).substring(2, 15)}`;

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  size,
  userId,
  initials,
}) => {
  const [randomId, setRandomId] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const { uploadAvatar } = useAvatarUploader(userId);
  const { hoverContentStyle, cameraIconStyle } = useAvatarPickerStyles();

  useEffect(() => {
    setRandomId(getRandomId());
  }, [setRandomId]);

  const hoverContent = !isHovering ? null : (
    <label htmlFor={randomId} style={hoverContentStyle}>
      <CameraIcon height="50%" width="50%" style={cameraIconStyle} />
    </label>
  );

  return (
    <Avatar
      {...{ size, initials, userId }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <form method="POST">
        {hoverContent}

        <input
          type="file"
          name="avatar"
          id={randomId}
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadAvatar(file);
          }}
        />
      </form>
    </Avatar>
  );
};
