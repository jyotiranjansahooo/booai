export const PLAN_LIMITS = {
  free: {
    maxBooks: 3,
    maxSessionsPerMonth: 10,
    maxDurationMinutes: 30,
  },
  starter: {
    maxBooks: 10,
    maxSessionsPerMonth: 50,
    maxDurationMinutes: 120,
  },
  pro: {
    maxBooks: 50,
    maxSessionsPerMonth: 200,
    maxDurationMinutes: 240,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;

export const getCurrentBillingPeriodStart = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};
