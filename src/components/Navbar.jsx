import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

import { logo } from "../utils/constants";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const Navbar = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItens: "center" }}>
        <img src={logo} alt="Logo" height={45} />
        <h1
          style={{
            color: "white",
            margin: "0",
            marginLeft: "25px",
            padding: "0",
            display: isMobile ? "none" : "",
          }}
        >
          UrTubw
        </h1>
      </Link>

      <SearchBar />
    </Stack>
  );
};

export default Navbar;
