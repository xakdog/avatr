import { NextApiRequest, NextApiResponse } from "next";

type JWTResponse = {
  token: string;
};

type JWTErrors = {
  error: string;
};

type JWTHandlerBuilderArgs<S> = {
  /**
   * Provide a session context to the handler.
   * This is useful if you want to use a session library like next-auth.
   *
   * @param args - NextApiRequest and NextApiResponse
   * @returns session - Session object
   * @example
   * ```ts
   * sessionContext: async ({ req, res }) => {
   *   const session = await getServerAuthSession({ req, res });
   *
   *   return { session };
   * }
   * ```
   */
  sessionContext: (args: {
    req: NextApiRequest;
    res: NextApiResponse;
  }) => Promise<S | null>;
  /**
   * Check the session in this callback. Make sure user is authenticated and allowed to change their avatar.
   * Call `grantPermission` to generate a JWT token.
   *
   * Return the token and it will be sent to the client.
   * If there is an error, just throw it and it will be sent to the client.
   *
   * @param req - NextApiRequest
   * @returns string - JWT token
   */
  authorizeAvatarChange: (
    req: NextApiRequest,
    session: S | null
  ) => Promise<string>;
};

/**
 * Create a Next.js API route handler for JWT requests.
 * @example
 * ```ts
 *  import { jwtNextHandler, grantPermission } from 'avatr';
 *  import { getServerAuthSession } from '../../../server/auth';
 *
 *  export default jwtNextHandler({
 *    sessionContext: getServerAuthSession,
 *
 *    async authorizeAvatarChange(req, session) {
 *      if (!session?.user) {
 *        throw new Error('Unauthorized');
 *      }
 *
 *      const userId = session.user.id;
 *
 *      // Check if user is allowed to change their avatar
 *      // ...
 *
 *      // Generate a JWT token
 *      const { token } = await grantPermission({
 *        userId,
 *        permission: 'avatar:change',
 *        apiSecretKey: INVITES_DEV_SECRET_KEY,
 *      });
 *
 *      return token;
 *    },
 *  });
 * ```
 */

export const jwtNextHandler =
  <S>(builderArgs: JWTHandlerBuilderArgs<S>) =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<JWTResponse | JWTErrors>
  ) => {
    const { method, body } = req;

    if (method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return;
    }

    let action = body.action as string;
    if (!action) {
      action = JSON.parse(body).action as string;
    }

    if (!action) {
      res.status(400).json({ error: "Missing action" });
      return;
    }

    if (action !== "avatar:change") {
      res.status(400).json({ error: "Unsupported action" });
      return;
    }

    const session = await builderArgs.sessionContext({ req, res });

    try {
      const token = await builderArgs.authorizeAvatarChange(req, session);
      res.status(200).json({ token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };
