export const handleTerminalCreation = (container, ws) => {
  container.exec(
    {
      cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      user: "sandbox",
    },
    (err, exec) => {
      if (err) {
        console.log("Error creating exec ", err);
        return;
      }
      exec.start(
        {
          hijack: true,
        },
        (err, stream) => {
          if (err) {
            console.log("Error starting exec ", err);
            return;
          }

          processStreamOutput(stream, ws);

          ws.on("message", (data) => {
            if (data == " getPort") {
              container.inspect((err, data) => {
                const port = data.NetworkSettings;
                console.log("port", port);
              });
              return;
            }
            stream.write(data);
          });
        }
      );
    }
  );
};

function processStreamOutput(stream, ws) {
  let nextDataType = null;
  let nextDataLength = null;
  let buffer = Buffer.from("");

  function processStreamData(data) {
    //This is the helper function to process incoming data messages

    if (data) {
      buffer = Buffer.concat([buffer, data]);
    }
    if (!nextDataType) {
      if (buffer.length >= 8) {
        const header = bufferSlicer(8);
        nextDataType = header.readUInt32BE(0);
        nextDataLength = header.readUInt32BE(4);

        processStreamData();
      }
    } else {
      if (buffer.length >= nextDataLength) {
        const content = bufferSlicer(nextDataLength);
        ws.send(content);
        nextDataType = null;
        nextDataLength = null;
        processStreamData();
      }
    }
  }
  function bufferSlicer(end) {
    const output = buffer.slice(0, end); //header of the chunk
    buffer = Buffer.from(buffer.slice(end, buffer.length)); // remaining of the chunk
    return output;
  }
  stream.on("data", processStreamData);
}
