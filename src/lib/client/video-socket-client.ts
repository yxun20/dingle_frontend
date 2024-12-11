const videoSocket = new WebSocket(`${process.env.VITE_SOCKET_URL}/video`);

videoSocket.onclose = () => {
  console.log('Video WebSocket disconnected');
};

export default videoSocket;
