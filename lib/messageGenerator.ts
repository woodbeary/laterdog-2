import { MatchData } from './mockData'

export const generateWingmanMessage = (profile: MatchData, currentUser: MatchData): string => {
  const languageComparison = profile.githubData.top_language === currentUser.githubData.top_language
    ? `You both speak the sacred tongue of ${profile.githubData.top_language}. It's like you're already finishing each other's semicolons.`
    : `Sure, you're a ${currentUser.githubData.top_language} guru and they're all about ${profile.githubData.top_language}. But hey, opposites attract, right? Think of the epic language wars you could have!`;

  const commitComparison = profile.githubData.total_commits > currentUser.githubData.total_commits
    ? `They've out-committed you ${profile.githubData.total_commits} to ${currentUser.githubData.total_commits}. Maybe they could teach you a thing or two about dedication.`
    : `You've got them beat in the commit game, ${currentUser.githubData.total_commits} to ${profile.githubData.total_commits}. But don't let that stop you from collaborating on some beautiful code together.`;

  const repoJoke = `With ${profile.githubData.public_repos} public repos, they're practically a code hoarder. But hey, at least they're not afraid of commitment... to their projects.`;

  const bioAnalysis = `Their bio says "${profile.profile.bio}" - which is either a clever algorithm or a cry for help. Either way, you're intrigued, aren't you?`;

  const finalPitch = `Look, I'm not saying they're the next Linus Torvalds, but they might be worth a code review. Who knows, maybe you two could debug each other's lives. Give 'em a chance and merge this pull request. Worst case, you can always revert later!`;

  return `Alright, listen up, code monkey. I've analyzed this potential mate, and here's the scoop:

${languageComparison}

${commitComparison}

${repoJoke}

${bioAnalysis}

${finalPitch}

Remember, in the grand repository of life, love is just another merge conflict waiting to be resolved. So, what do you say? Ready to initialize this relationship?`;
};