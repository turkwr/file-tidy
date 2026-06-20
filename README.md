# 🧹 File Tidy

> A fast and elegant command-line utility to automatically organize your messy folders by grouping files into categories based on their extensions. 

---

## ✨ Features

- **Smart Categorization**: Groups your files into logical folders like **Images**, **Documents**, **Code**, **Archives**, and **Design**.
- **Custom Targets**: Organize the current directory or specify any path on your machine.
- **Safe Execution**: Automatically ignores itself, `node_modules`, `.git`, and other project files to prevent accidental moves.
- **Beautiful Logs**: Watch your files get organized with visually pleasing terminal feedback.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/turkwr/file-tidy.git
cd file-tidy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Usage

You can use the script to tidy up the current folder or a specific target directory.

```bash
# Organize the current directory where the script is located
npm start

# Organize a specific directory by passing its path
npm start -- /path/to/your/messy/folder
```

---

## 📁 How It Works

The script checks the extension of every file in the target directory and moves it to the appropriate folder. If a folder doesn't exist, it creates one.

### Category Mappings:
- 🖼️ **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`
- 📄 **Documents**: `.pdf`, `.docx`, `.txt`, `.xlsx`, `.pptx`, `.md`
- 💻 **Code**: `.ts`, `.js`, `.json`, `.html`, `.css`, `.py`
- 📦 **Archives**: `.zip`, `.rar`, `.tar`, `.gz`
- 🎨 **Design**: `.psd`, `.ai`, `.fig`
- 🧩 **Others**: Any extension not listed above.

*(Directories and specific project files like `package.json`, `README.md`, or hidden `.dotfiles` are safely ignored).*

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
