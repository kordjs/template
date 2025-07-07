import { Command } from 'commander';
import prompts from 'prompts';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { execa } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type CLIOptions = {
    template: string;
    yes: boolean;
    install: boolean;
    git: boolean;
};

// Setup CLI
const program = new Command();

program
    .name('@kordjs/template')
    .description('Scaffold a new KordJS project from a template')
    .option('-t, --template <template>', 'Template to use', 'default')
    .option('-y, --yes', 'Skip prompts and use default values')
    .option('--no-install', 'Skip installing dependencies')
    .option('--no-git', 'Skip git initialization')
    .parse(process.argv);

const options = program.opts() as CLIOptions;

const run = async (opts: { template: string; yes: boolean; install: boolean; git: boolean }) => {
    const isYes = opts.yes;

    const defaultAnswers = {
        projectDirInput: '.',
        packageName: 'my-package',
        description: 'This is my package.',
        author: ''
    };

    const responses = isYes
        ? defaultAnswers
        : await prompts([
              {
                  type: 'text',
                  name: 'projectDirInput',
                  message: 'Where to create the project (e.g. "." for current directory)?',
                  initial: '.'
              },
              {
                  type: 'text',
                  name: 'packageName',
                  message: 'Package name:',
                  initial: 'my-package'
              },
              {
                  type: 'text',
                  name: 'description',
                  message: 'Description:',
                  initial: 'A KordJS powered project'
              },
              {
                  type: 'text',
                  name: 'author',
                  message: 'Author:'
              }
          ]);

    const cwd = process.cwd();
    const usingCurrentDir = responses.projectDirInput === '.' || responses.projectDirInput === './';
    const projectDir = usingCurrentDir ? cwd : path.resolve(cwd, responses.projectDirInput);

    // Confirm if writing in current directory
    if (usingCurrentDir && !isYes) {
        const { confirm } = await prompts({
            type: 'confirm',
            name: 'confirm',
            message: 'Generate project in the current directory?',
            initial: false
        });
        if (!confirm) process.exit(1);
    }

    // Block if target dir exists (unless it's current)
    if (!usingCurrentDir && fs.existsSync(projectDir)) {
        console.error(`❌ Directory "${responses.projectDirInput}" already exists.`);
        process.exit(1);
    }

    // Copy template
    const templateDir = path.resolve(__dirname, `../templates/${opts.template}`);
    if (!fs.existsSync(templateDir)) {
        console.error(`❌ Template "${opts.template}" not found.`);
        process.exit(1);
    }

    await fs.copy(templateDir, projectDir, {
        overwrite: true,
        errorOnExist: false
    });

    // Patch package.json
    const pkgPath = path.join(projectDir, 'package.json');
    if (fs.existsSync(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = responses.packageName;
        pkg.description = responses.description;
        pkg.author = responses.author;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }

    console.log(`\n✅ Project scaffolded at: ${responses.projectDirInput}`);
    console.log(`📦 Package name: ${responses.packageName}`);

    // Install dependencies
    if (opts.install) {
        console.log('📦 Installing dependencies...');
        await execa('npm', ['install'], { cwd: projectDir, stdio: 'inherit' });
    }

    // Initialize git
    if (opts.git) {
        console.log('🔧 Initializing git...');
        await execa('git', ['init'], { cwd: projectDir });
    }

    console.log('\n🎉 All done!');
};

run(options).catch((err) => {
    console.error('❌ Error during setup:', err);
    process.exit(1);
});
