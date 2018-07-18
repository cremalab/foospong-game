"use strict";

const Hapi = require("hapi");
const Nes = require("nes");

// Create a server with a host and port
const server = Hapi.server({
  port: 8000
});

const init = async () => {
  server.app.players = [];
  await server.register(require("inert"));
  await server.register({
    plugin: Nes,
    options: {
      // this is where client.message calls are received.
      onMessage: async function(socket, message) {
        console.log("message from a subscribed client", message);
      }
    }
  });

  server.subscription("/player/{playerNumber}");

  server.subscription("/startGame");

  server.route({
    method: ["PUT", "POST"],
    path: "/player/{playerNumber}",
    config: {
      handler: (request, h) => {
        server.publish(
          `/player/${request.params.playerNumber}`,
          request.payload
        );
        return "Player Update";
      }
    }
  });

  server.route({
    method: ["PUT", "POST"],
    path: "/startGame",
    config: {
      handler: (request, h) => {
        server.publish(`/startGame`, {});
        return "Start Game";
      }
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
