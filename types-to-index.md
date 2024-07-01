# Compile Types to Index

## Purpose

This is an attempt to get vscode to automatically create index.ts files form the types at the directory level. It's been written with a lot of help from Github Copilot.

## Usage

1. Define the folders in the './scripts/compile-types-index.js file' file
2. Type your type sin `.ts` files with your folders
3. On save, an `index.ts` file should be created or updated at the root level

## How it works

The compile-types-to-index script is a part of the npm scripts defined in the `package.json` file. It uses `tsc-watch` to watch for changes in TypeScript files and then runs a custom script when the TypeScript compilation succeeds.

### NPM Script

In the package.json file, the compile-types-to-index script is defined as follows:

```"compile-types-to-index": "tsc-watch --onSuccess \"node scripts/compile-types-to-index.js\""```

This script does two things

1. It starts the TypeScript compiler in watch mode (tsc-watch). This means that the compiler will watch for changes in TypeScript files and recompile them when they change.

2. When the TypeScript compilation succeeds (--onSuccess), it runs the node scripts/compile-types-to-index.js command. This command executes the compile-types-to-index.js script.

### JavaScript Script

The `compile-types-to-index.js` script is a custom script that is run after the TypeScript compilation succeeds. This script is a Node.js script that generates `index.ts` files for each specified folder in the folderPaths array. These index.ts files are used to export all TypeScript modules in the respective folders. 

## VSCode tasks.json

The `tasks.json` file in the `.vscode` directory defines a task `Types to Index` that is run from VSCode.  It starts the watcher automatically when the workspace is opened. 

## Ensuring Correct Execution

To ensure that the compile-types-to-index script runs correctly, you need to:

Have `tsc-watch` installed. This can be installed globally using ```npm install -g tsc-watch`` or locally to your project using npm install --save-dev tsc-watch.

Have Node.js installed to run the `compile-types-to-index.js` script.

Ensure that the TypeScript files that tsc-watch is watching compile without errors.

Ensure that the compile-types-to-index.js script does not contain any errors and performs the desired functionality.

If you are running the task from VSCode, ensure that the task is correctly defined in the tasks.json file.

## Author
Tim Hill