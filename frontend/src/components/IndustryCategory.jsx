import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select, Checkbox } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 30;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function IndustryCategory(props) {
  const { lista, name, onSelectionChange } = props;
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    setSelected(event.target.value);
    onSelectionChange(event.target.value);
  };

  return (
    <div>
    <FormControl sx={{ mt: 2, width: "100%"  }}>
      <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}>
        {lista.map((item) => (
          <MenuItem key={item} value={item}>
            <Checkbox checked={selected.indexOf(item) > -1} />
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </div>
  );
}

IndustryCategory.propTypes = {
  lista: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default IndustryCategory;
