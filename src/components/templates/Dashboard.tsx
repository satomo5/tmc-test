/** @jsxImportSource @emotion/react */
import { Box } from "@mui/material";
import Layout from "./Layout";
import { AuthProvider } from "../../contexts/Auth";
import Navigation from "../organisms/Navigation";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <AuthProvider>
        <Box display="flex">
          <Navigation />
          <Box minHeight="70vh" padding="120px 35px 25px" flex={1}>
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </Layout>
  );
}
