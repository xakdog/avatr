type GrantPermissionArgs = {
  userId: string;
  permission: string;
  apiSecretKey: string;
};

const PERMISSION_ENDPOINT = "https://api.invites.dev/permissions/client";

export const grantPermission = async ({
  userId,
  permission,
  apiSecretKey,
}: GrantPermissionArgs): Promise<{ token: string }> => {
  const response = await fetch(PERMISSION_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      userId,
      permission,
      apiSecretKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to grant permission");
  }

  const { token } = await response.json();
  return { token };
};
