/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import Rating from "@mui/material/Rating";

interface PostProps {
  username: string;
  title: string;
  content: string;
  publishDate: Date;
  likes: number;
}

export default function Post({ username, title, content, likes }: PostProps) {
  const [liked, setLiked] = React.useState(0);
  return (
    <Card
      variant="outlined"
      sx={{ width: 500, "--Card-radius": (theme) => theme.vars.radius.xs }}
    >
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              m: "-2px",
              borderRadius: "50%",
              background:
                "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            },
          }}
        >
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/30"
            sx={{
              border: "2px solid",
              borderColor: "background.body",
            }}
          />
        </Box>
        <Typography sx={{ fontWeight: "lg" }}>{username}</Typography>
      </CardContent>
      <CardOverflow>
        <AspectRatio>
          <img
            src="https://picsum.photos/600/400?random=1"
            alt=""
            loading="lazy"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        orientation="horizontal"
        sx={{ alignItems: "center", mx: -1 }}
      >
        <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
          {liked == 0 ? (
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => setLiked(1)}
            >
              <FavoriteBorder />
            </IconButton>
          ) : (
            <IconButton
              variant="plain"
              color="danger"
              size="sm"
              onClick={() => setLiked(0)}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          <Rating name="size-large" defaultValue={3} size="large" />
        </Box>
        <Box
          sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}
        ></Box>
      </CardContent>
      <CardContent>
        <Link
          component="button"
          underline="none"
          textColor="text.primary"
          sx={{ fontSize: "sm", fontWeight: "lg" }}
        >
          {likes} likes
        </Link>
        <Typography sx={{ fontSize: "sm", textAlign: "left" }}>
          <Link
            component="button"
            color="neutral"
            textColor="text.primary"
            sx={{ fontWeight: "lg" }}
          >
            {username}
          </Link>{" "}
          {content}
        </Typography>
        <Link
          component="button"
          underline="none"
          startDecorator="…"
          sx={{ fontSize: "sm", color: "text.tertiary" }}
        >
          more
        </Link>
        <Link
          component="button"
          underline="none"
          sx={{ fontSize: "10px", color: "text.tertiary", my: 0.5 }}
        >
          2 DAYS AGO
        </Link>
      </CardContent>
      <CardContent orientation="horizontal" sx={{ gap: 1 }}>
        <Input
          variant="plain"
          size="sm"
          placeholder="Add a comment…"
          sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
        />
        <Link disabled underline="none" role="button">
          Post
        </Link>
      </CardContent>
    </Card>
  );
}
