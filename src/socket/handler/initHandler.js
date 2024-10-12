import connection from "../class/connections.js";
import clientHandle from "./clientHandle.js";

export default class {
  constructor(props) {
    this.io = props.io;
    this.connections = new connection();
  }

  init() {
    this.io.on("connection", (socket) => {
      socket.on("disconnect", () => {
        this.connections.deleteConnection(socket.id);
        this.io.emit("userList", this.connections.getUsers());
      });
      const initList = [
        new clientHandle({
          io: this.io,
          socket,
          connections: this.connections,
        }),
      ];
      initList.forEach((init) => init.init());
    });

    setInterval(() => {
      const creator = this.connections.getCreator();

      if (creator == null) return;
      const files = creator.checkUpdateFiles();
      if (!Object.keys(files).length) return;

      this.io.emit("filesUpdate", getFilesNames(files));
    }, 1000);
  }
}

function getFilesNames(files) {
  const formatter = {};

  Object.keys(files).forEach((file) => {
    const fileName = file.split("/").at(-1);
    formatter[fileName] = files[file];
  });

  return formatter;
}
