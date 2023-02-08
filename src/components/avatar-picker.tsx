import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Avatar } from "./avatar";
import { AvatarSize } from "./avatar-context";
import { CameraIcon } from "./icons/camera-icon";
import { useAvatarPickerStyles } from "./avatar-picker.styles";
import { useAvatarUploader } from "./avatar-picker.uploader";
import { useRandomId } from "../helpers/random-id";

export type AvatarPickerProps = {
  size: AvatarSize;
  userId: string;
  initials?: string;
};

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  size,
  userId,
  initials,
}) => {
  const randomId = useRandomId("avatar-file-");
  const [isHovering, setIsHovering] = useState(false);

  const { uploadAvatar } = useAvatarUploader(userId);
  const { hoverContentStyle, cameraIconStyle } = useAvatarPickerStyles();

  const hoverContent = !isHovering ? null : (
    <label htmlFor={randomId} style={hoverContentStyle}>
      <CameraIcon height="50%" width="50%" style={cameraIconStyle} />
    </label>
  );

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadAvatar(file);
    },
    [uploadAvatar]
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
          id={randomId}
          onChange={onFileChange}
          type="file"
          name="avatar"
          accept="image/png, image/jpeg"
          style={{ display: "none" }}
        />
      </form>
    </Avatar>
  );
};
