'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

const FREE_PLAN: PlanType = 'free';

export const useSubscription = () => {
    const { has, isLoaded: isAuthLoaded } = useAuth();
    const { user, isLoaded: isUserLoaded } = useUser();

    const isLoaded = isAuthLoaded && isUserLoaded;

    if (!isLoaded) {
        return {
            plan: FREE_PLAN,
            limits: PLAN_LIMITS[FREE_PLAN],
            isLoaded: false
        };
    }

    let plan: PlanType = FREE_PLAN;

    // 1. First Check: Clerk's `has` helper from useAuth
    if (has?.({ plan: 'pro' })) {
        plan = 'pro';
    } else if (has?.({ plan: 'starter' })) {
        plan = 'starter';
    } 
    // 2. Second Check: Fallback to user public metadata if `has` fails (caching issue)
    else {
        const metadataPlan = (user?.publicMetadata?.plan || user?.publicMetadata?.billingPlan)?.toString().toLowerCase();
        
        if (metadataPlan === 'pro') {
            plan = 'pro';
        } else if (metadataPlan === 'starter') {
            plan = 'starter';
        }
    }

    return {
        plan,
        limits: PLAN_LIMITS[plan],
        isLoaded: true
    };
};
