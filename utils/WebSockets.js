class WebSockets {
  users = [];

  connection(socket) {
    socket.on("identity", () => {});
    socket.on("disconnect", () => {});
  }
}

export default new WebSockets();
