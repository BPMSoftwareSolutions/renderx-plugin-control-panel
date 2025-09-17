# CI/CD Configuration

This directory contains the GitHub Actions workflows and configuration files for the RenderX Plugin Control Panel project.

## 🚀 Workflows

### Core CI/CD Workflows

#### `ci.yml` - Main CI Pipeline
- **Triggers:** Push to `main`/`develop`, Pull Requests
- **Jobs:**
  - **Test & Build:** Runs on Node.js 18.x and 20.x
    - Type checking with TypeScript
    - ESLint code quality checks
    - Full test suite execution
    - Production build
    - Artifact uploads
  - **Code Quality:** ESLint with SARIF reporting
  - **Security Audit:** npm audit for vulnerabilities
  - **Test Results Publishing:** Publishes test results as PR comments

#### `release.yml` - Release Pipeline
- **Triggers:** Git tags (`v*`), Manual workflow dispatch
- **Jobs:**
  - **Validate Release:** Full test suite + version validation
  - **Build Release:** Creates production-ready package
  - **Publish:** NPM publishing (stable/beta based on tag)
  - **GitHub Release:** Creates GitHub release with notes

#### `pr-checks.yml` - Pull Request Validation
- **Triggers:** PR opened/updated
- **Jobs:**
  - **PR Validation:** Title format, breaking changes, coverage
  - **Dependency Review:** Security and license checks
  - **Auto-assign Reviewers:** Automatic reviewer assignment
  - **PR Labeler:** Automatic labeling based on changes
  - **Bundle Size Analysis:** Impact assessment

### Maintenance Workflows

#### `dependency-update.yml` - Automated Dependency Management
- **Triggers:** Weekly schedule (Mondays 9 AM UTC), Manual
- **Jobs:**
  - **Update Dependencies:** Safe patch/minor updates
  - **Security Audit:** Vulnerability scanning with issue creation

#### `performance.yml` - Performance Monitoring
- **Triggers:** Push to main, PRs, Weekly schedule
- **Jobs:**
  - **Bundle Analysis:** Size tracking and comparison
  - **Build Performance:** CI timing metrics

## 📋 Configuration Files

### Auto-assignment
- **`.github/auto-assign.yml`** - Automatic reviewer assignment rules
- Configure team members and assignment logic

### Labeling
- **`.github/labeler.yml`** - Automatic PR labeling based on file changes
- Labels by area (ui, logic, testing, docs, config, deps, build)
- Labels by type (feature, bugfix, chore, refactor)
- Labels by priority (high, medium, low)

## 🔧 Setup Requirements

### Repository Secrets
Add these secrets to your GitHub repository:

```bash
# Required for NPM publishing
NPM_TOKEN=your_npm_token_here

# GitHub token is automatically provided
GITHUB_TOKEN=automatically_provided
```

### Branch Protection Rules
Recommended branch protection for `main`:

- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Required status checks:
  - `Test & Build (18.x)`
  - `Test & Build (20.x)`
  - `Code Quality`
  - `Security Audit`
- ✅ Require pull request reviews before merging
- ✅ Dismiss stale PR approvals when new commits are pushed
- ✅ Require review from code owners
- ✅ Restrict pushes that create files

### Team Configuration
Update the following files for your team:

1. **`.github/auto-assign.yml`**
   ```yaml
   reviewers:
     - team-member-1
     - team-member-2
   ```

2. **`.github/labeler.yml`** - Customize labels as needed

## 📊 Monitoring & Reporting

### Test Results
- Test results are automatically published as PR comments
- Coverage reports are uploaded as artifacts
- Failed tests trigger notifications

### Bundle Size Tracking
- Bundle size is tracked on every PR
- Warnings for increases >50KB
- Historical size data in artifacts

### Security Monitoring
- Weekly vulnerability scans
- Automatic issue creation for security problems
- Dependency review on all PRs

### Performance Metrics
- Build time tracking
- CI performance monitoring
- Performance regression detection

## 🎯 Best Practices

### Commit Messages
Follow conventional commit format:
```
feat(scope): description
fix(scope): description
docs: description
chore: description
```

### PR Titles
Use conventional commit format for PR titles:
```
feat: add new control panel feature
fix(ui): resolve button styling issue
docs: update API documentation
```

### Release Process
1. Update version in `package.json`
2. Create git tag: `git tag v1.0.0`
3. Push tag: `git push origin v1.0.0`
4. Release workflow automatically handles the rest

## 🚨 Troubleshooting

### Common Issues

**CI failing on dependency install:**
- Check if `package-lock.json` is committed
- Verify Node.js version compatibility

**ESLint SARIF upload failing:**
- Ensure `@microsoft/eslint-formatter-sarif` is installed
- Check ESLint configuration syntax

**Release workflow not triggering:**
- Verify tag format matches `v*` pattern
- Check repository permissions for GitHub Actions

**Bundle size warnings:**
- Review added dependencies
- Check for accidentally committed build files
- Consider code splitting for large features

### Getting Help
- Check workflow logs in GitHub Actions tab
- Review failed job details and error messages
- Ensure all required secrets are configured
- Verify branch protection rules are properly set
