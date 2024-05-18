export function useProgrammingLanguages() {
  const languages = [
    "ReScript",
    "Python",
    "JavaScript",
    "HTML",
    "Go",
    "TypeScript",
    "C",
    "Java",
    "Kotlin",
    "Dart",
    "Swift",
    "PHP",
  ]

  return {
    languages: Array.from(languages),
  }
}
