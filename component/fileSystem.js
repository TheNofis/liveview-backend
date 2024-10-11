import { readFileSync, readdirSync, lstatSync } from "fs";
import { promises } from "fs";

export default class {
  dirFile = [];
  fileContent = {};

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
      if (this.fileContent[file] == fileContent) return; // Файл не изменился

      fileChange[file] = fileContent;
      this.fileContent[file] = fileContent; // обновляем содержимое файлов
    });

    return fileChange;
  }
  getFiles() {
    return this.fileContent;
  }
}
