import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)",
    },
  },
};

export default function MultipleSelectCheckmarks({
  data = [],
  label,
}: {
  data?: string[];
  label: string;
}) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl
      fullWidth
      className="text-black"
      sx={{ maxWidth: "280px", minWidth: "100px", border: "black" }}
    >
      <InputLabel
        id="checkbox-select-label"
        sx={{
          color: "black !important",
          border: "black",
          "&.Mui-focused": {
            color: "black !important",
          },
          "&.MuiInputLabel-shrink": {
            color: "black !important",
          },
        }}
      >
        {label}
      </InputLabel>

      <Select<string[]>
        labelId="checkbox-select-label"
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "8px",
          height: "48px",
          color: "black",

          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.2)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.35)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: "1.5px",
          },

          ".MuiSelect-select": {
            paddingY: "12px",
            paddingX: "14px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            color: "white",
          },

          ".MuiSelect-icon": {
            color: "black",
          },
        }}
      >
        {(data ?? []).map((name) => (
          <MenuItem
            key={name}
            value={name}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            }}
          >
            <Checkbox
              checked={personName.includes(name)}
              sx={{
                color: "black",
                "&.Mui-checked": {
                  color: "black",
                },
              }}
            />
            <ListItemText
              primary={name}
              sx={{
                "& .MuiTypography-root": {
                  color: "black",
                },
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
