export const getImagePath = (path) => {
    const prefix = "/pmkisan"; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  