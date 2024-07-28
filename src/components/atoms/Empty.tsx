/** @jsxImportSource @emotion/react */

import { Box, css, Typography } from "@mui/material";

type EmptyType = {
  title?: string;
  size?: string | number;
};
/**
 * Renders an empty component with an image and a title.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.title="You Don't Have a Todo Yet"] - The title to display.
 * @param {string | number} [props.size="70vh"] - The size of the component.
 * @return {JSX.Element} The rendered empty component.
 */
export default function Empty({
  title = "You Don't Have a Todo Yet",
  size = "70vh",
}: EmptyType) {
  // Render the empty component.
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={size}
      flexDirection="column"
    >
      {/* Render the empty image. */}
      <img
        src="/images/empty.png"
        alt="login"
        css={css`
          width: 100%;
          max-width: 250px;
          aspect-ratio: 1/1;
          object-fit: contain;
        `}
      />
      {/* Render the title. */}
      <Typography color="#154886" sx={{ opacity: 0.5 }}>
        {title}
      </Typography>
    </Box>
  );
}
