import { createContext } from "react";

export type AvatarSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl";

export type AvatarContextType = {
  avatarWrapper: React.CSSProperties;
  avatarImage: React.CSSProperties;
  "avatarImage[sm]": React.CSSProperties;
  "avatarImage[md]": React.CSSProperties;
  "avatarImage[lg]": React.CSSProperties;
  "avatarImage[xl]": React.CSSProperties;
  "avatarImage[2xl]": React.CSSProperties;
  "avatarImage[3xl]": React.CSSProperties;
  "avatarImage[4xl]": React.CSSProperties;
  "avatarImage[5xl]": React.CSSProperties;

  pickerHoverContent: React.CSSProperties;
  pickerCameraIcon: React.CSSProperties;
};

export type AvatarContextProps = {
  apiBaseUrl: string;
  customStyles: AvatarContextType;
};

export const AvatarContext = createContext<AvatarContextProps>({
  apiBaseUrl: "https://api.invites.dev/avatar",

  customStyles: {
    avatarWrapper: {},
    avatarImage: {},
    "avatarImage[sm]": {},
    "avatarImage[md]": {},
    "avatarImage[lg]": {},
    "avatarImage[xl]": {},
    "avatarImage[2xl]": {},
    "avatarImage[3xl]": {},
    "avatarImage[4xl]": {},
    "avatarImage[5xl]": {},

    pickerHoverContent: {},
    pickerCameraIcon: {},
  },
});
