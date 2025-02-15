import Docker from "dockerode";
const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
  try {
    const container = await docker.createContainer({
      Image: "sandbox",
      AttachStdin: true,
      AttachStderr: true,
      AttachStdout: true,
      CMD: ["bin/bash"],
      Tty: true,
      user: "sandbox",
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
        ExposedPorts: {
          "5173/tcp": {},
        },
        Env: ["HOST=0.0.0.0"],
      },
    });
    console.log("container created", container.id);
    await container.start();
    console.log("container started ");
  } catch (error) {
    console.log("error while creating container", error);
  }
};
