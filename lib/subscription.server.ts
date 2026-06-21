export const getUserPlan = async () => {
  // Fallback plan lookup for users without a tiered subscription in the database.
  // Replace with real plan resolution logic when subscription data is available.
  // Use a permissive default until the subscription system is implemented.
  return 'pro' as const;
};
