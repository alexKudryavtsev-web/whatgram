class WebSockets {
  users = [];
  connection(client) {
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== client.id);
    });

    client.on("identity", (userId, contactId) => {
      this.users.push({
        socketId: client.id,
        userId: userId,
      });
      client.join(contactId);
    });
  }
}

export default new WebSockets();
