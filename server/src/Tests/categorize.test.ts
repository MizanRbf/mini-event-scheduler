import { categorizeText } from "../Utils/categorize";

describe("categorizeText", () => {
  it("should categorize work-related text", () => {
    expect(categorizeText("Project meeting with client")).toBe("Work");
  });

  it("should categorize personal text", () => {
    expect(categorizeText("Family birthday party")).toBe("Personal");
  });

  it("should categorize health text", () => {
    expect(categorizeText("Doctor appointment at hospital")).toBe("health");
  });

  it("should categorize finance text", () => {
    expect(categorizeText("Pay salary and electricity bill")).toBe("finance");
  });

  it("should categorize home text", () => {
    expect(categorizeText("Grocery shopping and cooking")).toBe("home");
  });

  it("should categorize education text", () => {
    expect(categorizeText("Prepare for math exam and lecture")).toBe(
      "education"
    );
  });

  it("should return 'Other' for unknown text", () => {
    expect(categorizeText("Random text not matching")).toBe("Other");
  });
});
