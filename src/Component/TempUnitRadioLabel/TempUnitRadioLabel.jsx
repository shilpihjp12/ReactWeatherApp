import React from "react";
import { Box } from "@material-ui/core";

const RadioLabel = ({ children }) => {
  return (
    <Box component="div" fontSize={22}>
      {children}
    </Box>
  );
};

export default RadioLabel;