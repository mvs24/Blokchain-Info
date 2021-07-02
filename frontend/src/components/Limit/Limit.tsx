import Select from "react-select";
import classes from "./Limit.module.css";

const Limit = ({
  onLimitChange,
}: {
  onLimitChange: (limit: number) => void;
}) => {
  const limitOptions = [5, 10, 25, 50, 100].map((el) => ({
    value: el,
    label: el,
  }));

  return (
    <Select
      defaultValue={limitOptions[0]}
      className={classes.select}
      onChange={(value) => {
        onLimitChange(value!.value);
      }}
      placeholder="Results per page"
      options={limitOptions}
    />
  );
};

export default Limit;
