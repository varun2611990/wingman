// GitHub Extension for Wingman Launcher
module.exports = {
  name: 'GitHub Issues',
  command: 'github issues',
  description: 'List GitHub issues for a repository',
  type: 'extension',
  
  async run(args = []) {
    // This is a demo implementation
    // In a real scenario, you'd need GitHub API token and repository info
    
    const sampleIssues = [
      {
        number: 15,
        title: 'Add dark mode support',
        state: 'open',
        author: 'john-dev',
        url: 'https://github.com/user/repo/issues/15'
      },
      {
        number: 12,
        title: 'Fix responsive layout',
        state: 'open', 
        author: 'jane-designer',
        url: 'https://github.com/user/repo/issues/12'
      },
      {
        number: 8,
        title: 'Performance optimization',
        state: 'closed',
        author: 'mike-optimizer',
        url: 'https://github.com/user/repo/issues/8'
      }
    ];
    
    const openIssues = sampleIssues.filter(issue => issue.state === 'open');
    
    return {
      success: true,
      message: `Found ${openIssues.length} open issues`,
      data: {
        issues: openIssues,
        total: sampleIssues.length
      },
      formatted: this.formatIssues(openIssues)
    };
  },
  
  formatIssues(issues) {
    if (issues.length === 0) {
      return 'No open issues found! 🎉';
    }
    
    let formatted = 'Open GitHub Issues:\n\n';
    issues.forEach(issue => {
      formatted += `#${issue.number} ${issue.title}\n`;
      formatted += `   👤 ${issue.author}\n`;
      formatted += `   🔗 ${issue.url}\n\n`;
    });
    
    return formatted;
  }
};