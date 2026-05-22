export const PLAN_LIMITS = {
  free: {
    maxBooks: 3,
    maxDurationMinutes: 30,
  },
  starter: {
    maxBooks: 10,
    maxDurationMinutes: 120,
  },
  pro: {
    maxBooks: 50,
    maxDurationMinutes: 240,
  },
} as const;

export type PlanType = keyof typeof PLAN_LIMITS;
