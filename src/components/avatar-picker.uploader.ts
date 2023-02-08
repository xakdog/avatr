import { useCallback, useContext, useState } from "react";
import { getAuthToken, jwtSetupInstructions } from "../helpers/auth-token";
import { AvatarContext } from "./avatar-context";

export const useAvatarUploader = (userId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { apiBaseUrl } = useContext(AvatarContext);

  const uploadAvatar = useCallback(
    async (file: File) => {
      setIsUploading(true);

      let token = "";

      try {
        token = await getAuthToken();
      } catch (error: any) {
        setError(error);
        throw new Error(
          "Failed to get auth token. Make sure you have " +
            "set up /invites-dev/jwt endpoint correctly.\n\n" +
            jwtSetupInstructions
        );
      }

      if (!token) {
        throw new Error(
          "To use Avatr in production, you must provide a valid token. " +
            "Contact andre@invites.dev for more information."
        );
      }

      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("token", token);

      try {
        const response = await fetch(`${apiBaseUrl}/upload`, {
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
    [apiBaseUrl, userId, setIsUploading, setUploaded, setError]
  );

  return { isUploading, uploaded, error, uploadAvatar };
};
