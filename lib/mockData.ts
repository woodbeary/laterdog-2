export interface MatchData {
  id: string;
  name: string;
  username: string;
  image: string;
  githubData: {
    public_repos: number;
    followers: number;
    following: number;
    total_commits: number;
    top_language: string;
    account_age: number;
    lastActive: string;
    opensourceContributions: number;
    commitFrequency: string;
  };
  photos: string[];
  profile: {
    bio: string;
    location: string;
    age: number;
  };
  grokRoast: string;
  grokDetailedRoast: string;
  showUsername: boolean;
  badges: string[];
}

export const mockMatches: MatchData[] = [
  {
    id: '1',
    name: 'Alice Developer',
    username: 'alicedev',
    image: '/images/profile1.jpg',
    githubData: {
      public_repos: 45,
      followers: 230,
      following: 180,
      total_commits: 2500,
      top_language: "TypeScript",
      account_age: 5,
      lastActive: '2023-05-15',
      opensourceContributions: 23,
      commitFrequency: 'daily'
    },
    photos: [
      '/images/profile1.jpg',
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=2',
    ],
    profile: {
      bio: "Full-stack developer passionate about React and Node.js. Love solving complex problems and contributing to open-source projects.",
      location: 'San Francisco',
      age: 28
    },
    grokRoast: "Commits code faster than she commits to relationships. Her GitHub graph is greener than her social life.",
    grokDetailedRoast: "Alice's code is so clean, it makes Marie Kondo look like a hoarder. But her commit messages? They spark confusion, not joy.",
    showUsername: true,
    badges: ['30-day-streak', 'open-source-contributor', 'frequent-committer']
  },
  {
    id: '2',
    name: 'Emma Coder',
    username: 'emmacodes',
    image: '/images/profile2.jpg',
    githubData: {
      public_repos: 32,
      followers: 150,
      following: 120,
      total_commits: 1800,
      top_language: "JavaScript",
      account_age: 3,
      lastActive: '2023-05-10',
      opensourceContributions: 15,
      commitFrequency: 'weekly'
    },
    photos: [
      '/images/profile2.jpg',
      'https://picsum.photos/200/300?random=3',
      'https://picsum.photos/200/300?random=4',
    ],
    profile: {
      bio: "Frontend wizard specializing in Vue.js and CSS animations. Always looking for new challenges and opportunities to learn.",
      location: 'New York',
      age: 25
    },
    grokRoast: "Emma's pull requests are so long, they make 'War and Peace' look like a tweet.",
    grokDetailedRoast: "She's got 99 problems, and they're all merge conflicts. Her code is like her coffee - strong, complex, and keeps her up at night.",
    showUsername: true,
    badges: ['open-source-contributor']
  },
  {
    id: '3',
    name: 'Sophia Programmer',
    username: 'sophiaprog',
    image: '/images/profile3.jpg',
    githubData: {
      public_repos: 60,
      followers: 300,
      following: 200,
      total_commits: 3200,
      top_language: "Python",
      account_age: 7,
      lastActive: '2023-05-20',
      opensourceContributions: 30,
      commitFrequency: 'daily'
    },
    photos: [
      '/images/profile3.jpg',
      'https://picsum.photos/200/300?random=5',
      'https://picsum.photos/200/300?random=6',
    ],
    profile: {
      bio: "Machine learning enthusiast and open-source contributor. Passionate about using AI to solve real-world problems.",
      location: 'London',
      age: 31
    },
    grokRoast: "Sophia's code is so efficient, it makes Moore's Law look slow. Too bad her dating life doesn't follow the same exponential growth.",
    grokDetailedRoast: "She's fluent in Python, but her love life is more like COBOL - outdated and hard to maintain.",
    showUsername: true,
    badges: ['30-day-streak', 'frequent-committer']
  },
  {
    id: '4',
    name: 'Olivia Hacker',
    username: 'oliviahacks',
    image: '/images/profile4.jpg',
    githubData: {
      public_repos: 28,
      followers: 180,
      following: 95,
      total_commits: 1600,
      top_language: "Java",
      account_age: 4,
      lastActive: '2023-05-18',
      opensourceContributions: 10,
      commitFrequency: 'weekly'
    },
    photos: [
      '/images/profile4.jpg',
      'https://picsum.photos/200/300?random=7',
      'https://picsum.photos/200/300?random=8',
    ],
    profile: {
      bio: "Backend developer with a knack for scalable systems. Always up for a good coding challenge or hackathon.",
      location: 'Berlin',
      age: 29
    },
    grokRoast: "Olivia's code is like her coffee - strong, complex, and keeps her up at night.",
    grokDetailedRoast: "She can solve any NP-hard problem, except for finding a date on Friday night. Her love life is perpetually stuck in an infinite loop.",
    showUsername: true,
    badges: ['open-source-contributor', 'frequent-committer']
  },
  {
    id: '5',
    name: 'Mia Techie',
    username: 'miatechie',
    image: '/images/profile5.jpg',
    githubData: {
      public_repos: 50,
      followers: 270,
      following: 150,
      total_commits: 2800,
      top_language: "Ruby",
      account_age: 6,
      lastActive: '2023-05-19',
      opensourceContributions: 25,
      commitFrequency: 'daily'
    },
    photos: [
      '/images/profile5.jpg',
      'https://picsum.photos/200/300?random=9',
      'https://picsum.photos/200/300?random=10',
    ],
    profile: {
      bio: "Ruby on Rails expert and DevOps enthusiast. Passionate about creating efficient, scalable web applications.",
      location: 'Toronto',
      age: 27
    },
    grokRoast: "Mia's deployment pipeline is smoother than her pickup lines. She's got 99 problems, but a glitch ain't one.",
    grokDetailedRoast: "She treats her love life like her code - always looking for the optimal solution, but ending up with a lot of deprecated functions.",
    showUsername: true,
    badges: ['30-day-streak', 'open-source-contributor', 'frequent-committer']
  }
];