  import * as fs from 'fs';
  import * as path from 'path';
  import { createLogger } from '@turkwr/logger';

  // @turkwr/logger
  const logger = createLogger({
    banner: { title: "file-tidy" }
  });

  // define categories and their corresponding file extensions
  const categories: { [key: string]: string[] } = {
    "images": [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp"],
    "documents": [".pdf", ".docx", ".txt", ".xlsx", ".pptx", ".md"],
    "code": [".ts", ".js", ".json", ".html", ".css", ".py"],
    "archives": [".zip", ".rar", ".tar", ".gz"],
    "design": [".psd", ".ai", ".fig"]
  };

  function organizeFolder() {
    // get the input path from command line arguments or use current working directory
    const inputPath = process.argv[2] || process.cwd();
    const currentDir = path.resolve(inputPath);

    if (!fs.existsSync(currentDir)) {
      logger.error(`the provided path does not exist: ${currentDir}`);
      process.exit(1);
    }

    if (!fs.statSync(currentDir).isDirectory()) {
      logger.error(`the provided path is not a directory: ${currentDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(currentDir);

    logger.banner({ meta: "v1.0.0" });
    logger.info(`scanning and organizing the folder: ${currentDir}`);

    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);

      // skip directories and ignored files
      const ignoredFiles = [
        "index.ts", "index.js", "package.json", "package-lock.json", 
        "tsconfig.json", "README.md"
      ];
      const ignoredDirs = ["node_modules", "src", ".git"];
      
      if (
        (stat.isDirectory() && ignoredDirs.includes(file)) ||
        ignoredFiles.includes(file) ||
        file.startsWith(".") // skip dotfiles like .gitignore
      ) {
        continue;
      }

      const extension = path.extname(file).toLowerCase();
      let targetDirName = "others"; // default category for uncategorized files

      // determine the target directory based on file extension
      for (const [category, extensions] of Object.entries(categories)) {
        if (extensions.includes(extension)) {
          targetDirName = category;
          break;
        }
      }

      // create the target directory if it doesn't exist
      const targetDirPath = path.join(currentDir, targetDirName);
      if (!fs.existsSync(targetDirPath)) {
        fs.mkdirSync(targetDirPath);
        logger.event(`created directory: [${targetDirName}]`);
      }

      // move the file to the target directory
      fs.renameSync(fullPath, path.join(targetDirPath, file));
      logger.success(`${file} -> moved to [${targetDirName}] folder`);
    }

    logger.success("folder is now tidy and clean!");
  }

  // execute the organizeFolder function when the script is run
  organizeFolder();
