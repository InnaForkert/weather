import { useParams } from "react-router-dom";

export function Details() {
  const { cityId } = useParams();

  return <div>Now showing product with id - {cityId}</div>;
}
