import { useHistory, useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import { BlockDetail } from "../../types/BlockDetail";
import classes from "./BlockDetails.module.css";
import Button, { ButtonState } from "../../components/Button/Button";

const BlockDetails = React.memo(() => {
  const history = useHistory();
  const { hash } = useParams() as { hash: string };
  const [blockDetails, setBlockDetails] = useState<undefined | BlockDetail>();
  const { loading, sendRequest } = useHttp();
  const [error, setError] = useState<undefined | string>();

  const getBlockDetails = useCallback(async () => {
    try {
      const { data } = await sendRequest("get", `/api/v1/blocks/${hash}`);
      setBlockDetails(data);
    } catch (errorMessage) {
      setError(errorMessage);
    }
  }, [hash, sendRequest]);

  useEffect(() => {
    getBlockDetails();
  }, [getBlockDetails]);

  if (error) {
    return (
      <ErrorModal removeHandler={() => setError(undefined)}>{error}</ErrorModal>
    );
  }
  if (loading || !blockDetails) return <LoadingSpinner />;

  let blockDetailsToRender = [];
  const transactions = blockDetails!.tx;

  for (let key in blockDetails) {
    if (key !== "tx") {
      //@ts-ignore
      blockDetailsToRender.push({ attribute: key, value: blockDetails[key] });
    }
  }

  return (
    <div className={classes.blockDetailsContainer}>
      <Button title="Go back!" onClick={() => history.push("/")} />
      <h2>Block Details: (hash: {hash})</h2>
      {blockDetailsToRender.map(({ attribute, value }) => (
        <div key={attribute}>
          {attribute}: <span className={classes.blockDetailValue}>{value}</span>
        </div>
      ))}
    </div>
  );
});

export default BlockDetails;
