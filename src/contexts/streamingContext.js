import React from "react";

const StreamingContext = React.createContext();

const StreamingProvider = StreamingContext.Provider;
const StreamingConsumer = StreamingContext.Consumer;

export { StreamingProvider, StreamingConsumer };
export default StreamingContext;
