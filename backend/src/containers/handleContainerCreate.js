import Docker from "dockerode";
const docker = new Docker();

export const handleContainerCreate = async (
  projectId,
  terminalSocket,
  req,
  tcpSocket,
  head
) => {
  try {
    const container = await docker.createContainer({
      Image: "sandbox",
      AttachStdin: true,
      AttachStderr: true,
      AttachStdout: true,
      Cmd: ["/bin/bash"],
      Tty: true,
      user: "sandbox",
      Volumes: {
        "/home/sandbox/app": {},
      },
      ExposedPorts: {
        "5173/tcp": {},
      },
      Env: ["HOST=0.0.0.0"],
      HostConfig: {
        Binds: [
          // mounting the project directory to the container
          `${process.cwd()}/projects/${projectId}:/home/sandbox/app`,
        ],
        PortBindings: {
          "5173/tcp": [
            {
              Hostport: "0", // Random port will be assigned by the docker
            },
          ],
        },
      },
    });
    console.log("container created", container.id);
    await container.start();
    console.log("container started ");

    // Below is the place where we upgrade the connection to websocket
    terminalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSConn) => {
      terminalSocket.emit("connection", establishedWSConn, req, container);
    });
  } catch (error) {
    console.log("error while creating container", error);
  }
};
