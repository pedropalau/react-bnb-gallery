Review this pull request in the current repository checkout.

Primary priorities:
- correctness and behavior regressions
- security issues
- performance risks
- missing tests for behavior changes

Use git history and diffs from the current PR context to scope your analysis.

Output requirements:
- If there are no actionable issues, output exactly: `No findings`.
- Otherwise, list findings ordered by severity.
- For each finding include:
  - severity
  - file path
  - short explanation
  - concrete fix recommendation
- Keep the response concise and avoid non-technical filler.
