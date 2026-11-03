export const plans = [
  {
    id: "junior",
    name: "Junior Spark",
    price: 39,
    audience: "Ages 6–15",
    summary: "Two coached sessions a week in one sport, with a coach who knows the group.",
    features: [
      "Two group sessions each week",
      "One sport included",
      "Starter kit loan for the first month",
      "Holiday camps at member rates",
    ],
  },
  {
    id: "active",
    name: "Club Active",
    price: 69,
    audience: "Ages 16 and over",
    popular: true,
    summary: "The membership most adults choose. Train in two sports and play club fixtures.",
    features: [
      "Group sessions in two sports",
      "League entry for club teams",
      "Member lounge access",
      "One guest pass each month",
    ],
  },
  {
    id: "family",
    name: "Family Court",
    price: 149,
    audience: "Two adults and two juniors",
    summary: "One household account for adults and children who may play different sports.",
    features: [
      "Up to four named members",
      "Junior and adult sessions",
      "Shared guest passes",
      "First choice on camp weeks",
    ],
  },
  {
    id: "elite",
    name: "Elite Squad",
    price: 119,
    audience: "Performance pathway, ages 16+",
    summary: "For members who want a coached block and review, not only open practice.",
    features: [
      "Group sessions in every sport",
      "One personal coaching block a month",
      "Video review with your lead coach",
      "Early entry to club tournaments",
    ],
  },
]

export function isPlanId(id) {
  return plans.some((plan) => plan.id === id)
}
