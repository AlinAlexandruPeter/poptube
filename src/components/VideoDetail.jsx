import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import IOSSwitch from "./IOSSwitch";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const percentage = isMobile ? 0.9 : 0.65;

const VideoDetail = () => {
  const [autoplay, setAutoplay] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const onVideoEnd = () => {
    setTimeout(() => {
      if (autoplay) navigate(`/video/${nextId}`);
    }, 1500);
  };

  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);

  let nextId;
  if (videos?.length) nextId = [videos[0].id.videoId];

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <YouTube
              videoId={id}
              style={{
                marginInline: "5%",
              }}
              opts={{
                width: percentage * window.innerWidth,
                height: percentage * window.innerHeight,
              }}
              onEnd={onVideoEnd}
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  {channelTitle}
                  <CheckCircle
                    sc={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          sx={{ position: "relative" }}
        >
          <Stack
            direction="row"
            sx={{
              borderBottom: "1px solid #ccc",
              background: "black",
              position: "sticky",
              width: "100%",
              top: "0",
              right: "0",
              zIndex: "5",
            }}
            mb={2}
            p={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant={{ xs: "h5", md: "h4" }}
              color="#fff"
              fontSize={25}
            >
              <label htmlFor="autoplay">Autoplay</label>
            </Typography>
            <IOSSwitch
              name="autoplay"
              onClick={() => setAutoplay((prevStatus) => !prevStatus)}
            />
          </Stack>
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
