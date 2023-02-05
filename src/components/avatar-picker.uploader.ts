import { useCallback, useContext, useState } from "react";
import { getDeveloperToken } from "../helpers/developer-key";
import { AvatarContext } from "./avatar-context";

export const useAvatarUploader = (userId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { apiEndpoint } = useContext(AvatarContext);

  const uploadAvatar = useCallback(
    async (file: File) => {
      setIsUploading(true);

      const token = getDeveloperToken();

      if (!token) {
        throw new Error(
          "To use Avatr in production, you must provide a valid token. " +
            "Contact andre@invites.dev for more information."
        );
      }

      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("token", `${token}.${userId}`);

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload avatar");
        }

        setUploaded(true);
      } catch (error: any) {
        setError(error);
        console.warn("Failed to upload avatar. Contact developers at:");
        //  Show in bold to contact andre@invites.dev
        console.warn("%candre@invites.dev", "font-weight: bold;");
      } finally {
        setIsUploading(false);
      }
    },
    [apiEndpoint, userId, setIsUploading, setUploaded, setError]
  );

  return { isUploading, uploaded, error, uploadAvatar };
};
