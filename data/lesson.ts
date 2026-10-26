export type Command = {
  command: string;
  output: string;
  hint: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  commands: Command[];
};

export const lessons: Lesson[] = [
  {
    id: 'pwd',
    title: 'Where am I? (pwd)',
    level: 'Beginner',
    description: 'Learn to find your current directory.',
    commands: [
      {
        command: 'pwd',
        output: '/data/data/com.termux/files/home',
        hint: 'Type "pwd" — it stands for Print Working Directory.',
        explanation: 'pwd tells you which folder you are currently inside.',
      },
    ],
  },
  {
    id: 'ls',
    title: 'List files (ls)',
    level: 'Beginner',
    description: 'See what is inside the current folder.',
    commands: [
      {
        command: 'ls',
        output: 'projects/  Downloads/  notes.txt',
        hint: 'Type "ls" to list the contents of the current folder.',
        explanation: 'ls lists files and folders in your current directory.',
      },
      {
        command: 'ls -la',
        output:
          'drwx------  projects/\ndrwx------  Downloads/\n-rw-------  notes.txt',
        hint: 'Try "ls -la" to see all files with details.',
        explanation: '-la shows hidden files and extra details.',
      },
    ],
  },
  {
    id: 'mkdir',
    title: 'Create a folder (mkdir)',
    level: 'Beginner',
    description: 'Make a new directory.',
    commands: [
      {
        command: 'mkdir projects',
        output: '',
        hint: 'Type "mkdir projects" to create a folder called projects.',
        explanation: 'mkdir makes a new directory. Nothing is printed on success.',
      },
      {
        command: 'ls',
        output: 'projects/  Downloads/  notes.txt',
        hint: 'Verify with "ls".',
        explanation: 'Now you can see your new folder.',
      },
    ],
  },
  {
    id: 'cd',
    title: 'Change directory (cd)',
    level: 'Beginner',
    description: 'Move between folders.',
    commands: [
      {
        command: 'cd projects',
        output: '',
        hint: 'Type "cd projects" to enter the projects folder.',
        explanation: 'cd changes your current directory.',
      },
      {
        command: 'pwd',
        output: '/data/data/com.termux/files/home/projects',
        hint: 'Verify with "pwd".',
        explanation: 'Now pwd shows you are inside projects.',
      },
    ],
  },
  {
    id: 'pkg',
    title: 'Install packages (pkg)',
    level: 'Intermediate',
    description: 'Update and install software in Termux.',
    commands: [
      {
        command: 'pkg update',
        output:
          'Reading package lists... Done\nBuilding dependency tree... Done',
        hint: 'Type "pkg update" to refresh package lists.',
        explanation: 'pkg update refreshes the list of available packages.',
      },
      {
        command: 'pkg install python',
        output: 'Installing python...\nPython 3.11 installed successfully.',
        hint: 'Type "pkg install python" to install Python.',
        explanation: 'pkg install <name> installs a package.',
      },
    ],
  },
  {
    id: 'nano',
    title: 'Edit files (nano)',
    level: 'Intermediate',
    description: 'Open a simple text editor.',
    commands: [
      {
        command: 'nano hello.txt',
        output:
          '[ nano opened hello.txt — type text, then Ctrl+O, Enter, Ctrl+X to save and exit ]',
        hint: 'Type "nano hello.txt" to open the editor.',
        explanation: 'nano is a beginner-friendly terminal text editor.',
      },
    ],
  },
  {
    id: 'curl',
    title: 'Fetch from the web (curl)',
    level: 'Intermediate',
    description: 'Download content from the internet.',
    commands: [
      {
        command: 'curl https://example.com',
        output: '<html><body><h1>Example Domain</h1></body></html>',
        hint: 'Type "curl https://example.com" to fetch a page.',
        explanation: 'curl downloads and prints the contents of a URL.',
      },
    ],
  },
  {
    id: 'ssh',
    title: 'Connect remotely (ssh)',
    level: 'Advanced',
    description: 'Connect to another computer.',
    commands: [
      {
        command: 'ssh user@example.com',
        output: "user@example.com's password:\nWelcome to Ubuntu 22.04",
        hint: 'Type "ssh user@example.com" to connect.',
        explanation: 'ssh lets you log into another machine remotely.',
      },
    ],
  },
  {
    id: 'alias',
    title: 'Create shortcuts (alias)',
    level: 'Advanced',
    description: 'Make your own commands.',
    commands: [
      {
        command: "alias ll='ls -la'",
        output: '',
        hint: 'Type: alias ll=\'ls -la\'',
        explanation: 'alias creates a shortcut for a command.',
      },
      {
        command: 'll',
        output:
          'drwx------  projects/\ndrwx------  Downloads/\n-rw-------  notes.txt',
        hint: 'Now type "ll" to run the shortcut.',
        explanation: 'Now "ll" behaves exactly like "ls -la".',
      },
    ],
  },
];
