import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const BlockDetails = React.memo(() => {
  const { hash } = useParams() as { hash: string };
  const [blockDetails, setBlockDetails] = useState();
  const { loading, sendRequest } = useHttp();
  const [error, setError] = useState<undefined | string>();

  const getBlockDetails = useCallback(async () => {
    try {
      const { data } = await sendRequest("get", `/api/v1/blocks/${hash}`);
      setBlockDetails(data);
    } catch (errorMessage) {
      setError(errorMessage);
    }
  }, [hash]);

  useEffect(() => {
    getBlockDetails();
  }, [getBlockDetails]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorModal removeHandler={() => setError(undefined)}>
          {error}
        </ErrorModal>
      )}
    </>
  );
});

export default BlockDetails;
