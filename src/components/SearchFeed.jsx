import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setVideos(data.items);
    });
  }, [searchTerm]);

  return (
    <Box sx={{ overflow: "auto", height: "90vh", flex: 2, marginLeft: "25px" }}>
      <Typography
        variant={{ xs: "h5", md: "h4" }}
        fontWeight="bold"
        mb={5}
        sx={{ color: "white" }}
      >
        Search results for{" "}
        <span style={{ color: "#f31503" }}>{searchTerm}</span>
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
