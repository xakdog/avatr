export const getAuthToken = async () => {
  const response = await fetch(`/api/invites-dev/jwt`, {
    method: "POST",
    body: JSON.stringify({
      action: "avatar:change",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }

  const { token } = await response.json();
  return token;
};

export const jwtSetupInstructions = `
// Copy this snippet to /pages/api/invites-dev/jwt.ts

import { jwtNextHandler, grantPermission } from 'avatr';
import { getServerAuthSession } from '../../../server/auth';


export default jwtNextHandler({
  sessionContext: getServerAuthSession,

  async authorizeAvatarChange(req, session) {
    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const { token } = await grantPermission({
      permission: 'avatar:change',
      apiSecretKey: INVITES_DEV_SECRET_KEY,
      userId: session.user.id,
    });

    return token;
  },
});
`;
