import { useEffect, useState } from "react";

export function useWatchPosition() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Your browser does not support use location hook");
      return;
    }

    const success = (position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    };

    const error = (error) => {
      setError(error.message);
      throw new Error(error.message);
    };

    const watchId = navigator.geolocation.watchPosition(success, error);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { position, error };
}
