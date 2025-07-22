export type Category =
  | "Work"
  | "Personal"
  | "health"
  | "finance"
  | "home"
  | "education"
  | "Other";

export function categorizeText(title: string, notes: string = ""): Category {
  const text = `${title} ${notes}`.toLowerCase();

  const workKeywords = ["meeting", "project", "client", "deadline", "report"];
  const personalKeywords = ["birthday", "family", "friend", "wedding", "trip"];
  const healthKeywords = [
    "doctor",
    "hospital",
    "medicine",
    "checkup",
    "fitness",
  ];
  const financeKeywords = ["invoice", "payment", "salary", "bill", "budget"];
  const homeKeywords = ["cleaning", "repair", "grocery", "cooking", "laundry"];
  const educationKeywords = ["exam", "assignment", "class", "lecture", "study"];

  if (workKeywords.some((word) => text.includes(word))) return "Work";
  if (personalKeywords.some((word) => text.includes(word))) return "Personal";
  if (healthKeywords.some((word) => text.includes(word))) return "health";
  if (financeKeywords.some((word) => text.includes(word))) return "finance";
  if (homeKeywords.some((word) => text.includes(word))) return "home";
  if (educationKeywords.some((word) => text.includes(word))) return "education";

  return "Other";
}
