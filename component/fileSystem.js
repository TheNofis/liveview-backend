import { readFileSync, readdirSync, lstatSync } from "fs";
import { promises } from "fs";

export default class {
  dirFile = [];
  filesContent = {};

  createRootDir(folder) {
    this.dirFile = [];
    this.recursiveRootDir(folder);
  }
  recursiveRootDir(folder) {
    promises
      .readdir(folder)
      .then((files) => {
        files.forEach((file) => {
          const fullPath = `${folder}/${file}`;
          if (lstatSync(fullPath).isDirectory())
            this.recursiveRootDir(fullPath);
          else this.dirFile.push(fullPath);
        });
      })
      .catch((err) => console.log(`Error to recursive: ${folder} ${err}`));
  }
  checkUpdateFiles() {
    if (!this.dirFile.length) return {};

    const fileChange = {};

    this.dirFile.forEach((file) => {
      const fileContent = readFileSync(file, "utf8");
      if (this.filesContent[file] == fileContent) return; // Файл не изменился

      fileChange[file] = fileContent;
      this.filesContent[file] = fileContent; // обновляем содержимое файлов
    });

    return fileChange;
  }
  getFilesContent() {
    return this.filesContent;
  }
}
