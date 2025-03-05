    FROM ubuntu:20.04

    # Setup the user 
    RUN useradd -ms /bin/bash sandbox

    #Setup working directory
    RUN mkdir -p /home/sandbox/app

    WORKDIR /home/sandbox

    # update the ubuntu machine 
    RUN apt update && apt upgrade -y

    # install nano and curl
    RUN apt install nano curl -y

    # install nodejs

    RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs

    # configuring the terminal to display the current working directory
    RUN echo "PS1='\w'" >> /home/sandbox/.bashrc

    # Setup final working directory
    WORKDIR /home/sandbox/app

