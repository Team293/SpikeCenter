# Contributing to SpikeCenter

Thank you for your interest in contributing!
SpikeCenter is a community-driven project, and we welcome contributions of all kinds — code, documentation, bug reports, feature requests, and more.

---

## 📌 Ground Rules

- **Clarity over cleverness**: Write code and documentation for human readers first.
- **Small, focused PRs**: Easier to review, merge, and debug.
- **Keep discussions public**: Use GitHub Issues or Discussions so others can learn.

---

## 🐛 Filing Issues

We use **GitHub Issues** to track:
- **Bug Reports**: Use the "🐛 Bug Report" template.
- **Feature Requests**: Use the "💡 Feature Request" template.
- **Documentation Updates**: Use the "📝 Documentation Update" template.

**Before filing an issue:**
1. Search existing issues to avoid duplicates.
2. Reproduce bugs with the latest `production` branch before reporting (or on production website).

---

## 🔧 Pull Requests

All PRs must:
1. Be linked to at least one issue (`Closes #<issue_number>` in the description).
2. Pass linting locally.
3. Update **documentation** if behavior changes.
5. Follow the [PR Template](.github/PULL_REQUEST_TEMPLATE.md).

**Branch naming convention:**
Examples:
- `bugfix/fix-login-crash`
- `feature/add-scouting-dashboard`
- `docs/update-install-guide`

---

## 🛠 Local Development Setup

**Setup:**
```bash
git clone https://github.com/Team293/SpikeCenter.git
cd SpikeCenter
pnpm install
pnpm dev:setup
pnpm dev
```
