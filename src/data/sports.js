import { unsplash } from "./photos"

export const sports = [
  {
    slug: "cricket",
    name: "Cricket",
    featured: true,
    level: "Beginner to club league",
    summary: "Leather-ball and tennis-ball cricket on the club ground, from first nets to Sunday matches.",
    details:
      "Juniors train in small groups so everyone bats and bowls in the hour. Seniors play a T20-style fixture most Sundays in season, and move to the indoor nets when the ground is wet. Loan kit covers the first month.",
    ages: "Ages 6–15 and 16+",
    venue: "Riverside ground and indoor nets",
    rhythm: "Tuesday, Thursday, and Sunday",
    coach: "Priya Nair",
    coachId: "priya-nair",
    image: unsplash("photo-1531415074968-036ba1b575da"),
    imageAlt: "A cricketer batting during a match",
    sessions: [
      "Tuesday · Junior nets · 4:30–6:00pm",
      "Thursday · Senior skills · 7:00–8:30pm",
      "Sunday · Match play · 8:00am–12:00pm",
    ],
  },
  {
    slug: "football",
    name: "Football",
    featured: true,
    level: "Youth academy and adult squads",
    summary: "Small-sided skills in the week and a proper game on the weekend pitches.",
    details:
      "Youth groups are split by age, not by who already plays for a school. Adults can join recreational 7-a-side or the Saturday 11-a-side squad. Boots are required on grass, and the desk keeps spare shin pads.",
    ages: "Under-8 to under-16, and adults",
    venue: "Riverside pitches",
    rhythm: "Monday, Wednesday, and Saturday",
    coach: "Omar Haddad",
    coachId: "omar-haddad",
    image: unsplash("photo-1574629810360-7efbbe195018"),
    imageAlt: "A footballer striking the ball on a grass pitch",
    sessions: [
      "Monday · Under-8 to under-12 · 4:30–5:45pm",
      "Wednesday · Youth and adults · 6:00–7:30pm",
      "Saturday · Club fixtures · 9:00am–1:00pm",
    ],
  },
  {
    slug: "basketball",
    name: "Basketball",
    featured: true,
    level: "Skills labs and league runs",
    summary: "Skill labs and full-court runs in the main hall, with a winter league team.",
    details:
      "Sessions open with ball handling, move to one theme — finishing, screens, or defense — and end in games. The coach tracks the habit for the night, not only the score. Open gym is posted on the lounge board.",
    ages: "Ages 10–15 and 16+",
    venue: "Main hall",
    rhythm: "Tuesday, Friday, and Saturday",
    coach: "Marcus Hale",
    coachId: "marcus-hale",
    image: unsplash("photo-1546519638-68e109498ffc"),
    imageAlt: "An indoor basketball court and hoop",
    sessions: [
      "Tuesday · Junior skills · 5:00–6:15pm",
      "Friday · Adult runs · 7:30–9:00pm",
      "Saturday · Squad practice · 10:00–11:30am",
    ],
  },
  {
    slug: "badminton",
    name: "Badminton",
    featured: false,
    level: "First rallies to match play",
    summary: "Six indoor courts for first rallies, coached drills, and a Thursday doubles ladder.",
    details:
      "Beginners start on a short court with a coach feeding the shuttle. Match-play members join the ladder, which is reseeded each month. Rackets are loaned for the first four visits.",
    ages: "Ages 8 and over",
    venue: "Main hall courts",
    rhythm: "Monday, Thursday, and Saturday",
    coach: "Elena Voss",
    coachId: "elena-voss",
    image: unsplash("photo-1626224583764-f87db24ac4ea"),
    imageAlt: "A badminton player hitting a shuttle on an indoor court",
    sessions: [
      "Monday · Beginner group · 6:00–7:00pm",
      "Thursday · Doubles ladder · 7:00–9:00pm",
      "Saturday · Junior development · 9:00–10:15am",
    ],
  },
  {
    slug: "tennis",
    name: "Tennis",
    featured: false,
    level: "Juniors, cardio, and ladders",
    summary: "Floodlit hard courts for cardio tennis, junior development, and adult matchplay.",
    details:
      "Courts are booked through the desk so groups stay small. Juniors work in fours. Adults can join a hitting group or the Sunday ladder. Floodlights cover the last booking of the evening.",
    ages: "Ages 6–15 and 16+",
    venue: "Four hard courts",
    rhythm: "Wednesday, Friday, and Sunday",
    coach: "Maya Chen",
    coachId: "maya-chen",
    image: unsplash("photo-1554068865-24cecd4e34b8"),
    imageAlt: "A tennis racket and ball on a hard court",
    sessions: [
      "Wednesday · Junior development · 4:15–5:30pm",
      "Friday · Adult tactics · 6:30–8:00pm",
      "Sunday · Matchplay ladder · 9:00–11:00am",
    ],
  },
]

export const featuredSports = sports.filter((sport) => sport.featured)

export function isSportSlug(slug) {
  return sports.some((sport) => sport.slug === slug)
}
