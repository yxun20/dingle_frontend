const audioSocket = new WebSocket(`${process.env.VITE_SOCKET_URL}/audio`);

audioSocket.onclose = () => {
  console.log('Audio WebSocket disconnected');
};

export default audioSocket;
