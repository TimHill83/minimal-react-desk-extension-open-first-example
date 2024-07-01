const fs = require('fs');
const path = require('path');
const glob = require('glob');

const folderPaths = ['./src/types/ZohoDesk', './src/types/KeyzappHelper']; // Add your folder paths here

// Loop through each folder path and generate an index.ts file
folderPaths.forEach((folderPath) => {
  const indexPath = path.join(folderPath, 'index.ts');

  // Find all .ts files in the folder, excluding the index.ts file
  glob(
    `${folderPath}/**/*.ts`,
    { ignore: `${folderPath}/index.ts` },
    (err, files) => {
      if (err) throw err;

      // Generate the export statements for each file
      const exports = files
        .filter((file) => path.basename(file) !== 'index.ts') // Ignore index.ts files
        .map((file) => {
          const relativePath = path
            .relative(folderPath, file)
            .replace(/\.ts$/, ''); // Get path relative to root folder and remove .ts extension
          return `export * from './${relativePath.replace(/\\/g, '/')}';\n`; // Replace backslashes with forward slashes for Windows compatibility
        })
        .join('');

      // Only write to the file if the content has changed
      if (
        !fs.existsSync(indexPath) ||
        fs.readFileSync(indexPath, 'utf8') !== exports
      ) {
        fs.writeFileSync(indexPath, exports);
        console.log(`index.ts has been generated in ${folderPath}`);
      }
    }
  );
});
