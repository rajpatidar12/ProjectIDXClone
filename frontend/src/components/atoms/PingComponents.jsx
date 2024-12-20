import usePing from "../../hooks/apis/queries/usePing.js";
export const PingComponents = () => {
  const { isLoading, data } = usePing();
  if (isLoading) {
    return <>Loading...</>;
  }
  return <>Hello{data.message}</>;
};
