export const getDeveloperToken = () => {
  const isLocalhost = window.location.hostname === "localhost";
  if (!isLocalhost) return undefined;

  const developerToken = localStorage.getItem("invites.developerToken");
  if (developerToken) return developerToken;

  const newDeveloperToken = Math.random().toString(36).substring(2, 15);

  localStorage.setItem("invites.developerToken", newDeveloperToken);

  return "dev_" + newDeveloperToken;
};
