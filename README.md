<div align="center">
  <h1>@kordjs/template</h1>
  <p>
    <b>Scaffold KordJS projects in seconds — customizable, type-safe, and flexible. - For community developers</b>
  </p>
  <p>
    <a href="https://www.npmjs.com/package/@kordjs/template">
      <img src="https://img.shields.io/npm/v/@kordjs/template?style=flat-square" alt="npm version" />
    </a>
    <a href="https://github.com/kordjs/template/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/kordjs/template?style=flat-square" alt="license" />
    </a>
  </p>
</div>

---

## Features

* 📆 Customizable `package.json` via prompts
* ✅ Supports scaffolding into current directory (`.`)
* ⚙️ CLI flags (`--template`, `--yes`, `--no-install`, `--no-git`)
* 🔒 Type-safe, built with TypeScript
* 🔧 Automatically installs dependencies and initializes Git

---

## Installation

```sh
npx @kordjs/template
```

---

## Usage

```bash
npx @kordjs/template --help
```

You’ll be prompted for:

* Where to scaffold the project (e.g. `.` or `app`)
* Package name
* Description
* Author

You can also skip prompts using flags.

---

## CLI Options

| Flag             | Description                             | Default   |
| ---------------- | --------------------------------------- | --------- |
| `--template, -t` | Template to use (`default`, etc.) | `default` |
| `--yes, -y`      | Skip prompts and use default values     | `false`   |
| `--no-install`   | Skip dependency installation            | `false`   |
| `--no-git`       | Skip git repository initialization      | `false`   |

Example:

```bash
npx @kordjs/template -t default --yes --no-git
```

---

## Template Structure

All templates live in:

```
templates/
├── default/
```

---

## Development

```sh
pnpm install
pnpm build      # Compile TypeScript
pnpm dev        # Run CLI using ts-node
```

To test locally:

```sh
node bin/index.js -t default
```

---

## License

[MIT](./LICENSE) ©️ kordjs