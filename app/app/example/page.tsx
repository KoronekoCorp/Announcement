import { AnnouncementProvider } from "@/components/Announcement";
import { H2 } from "@/components/H2";
import { Container } from "@mui/material";

export default async function Page() {
    return <Container>
        <H2>Test</H2>
        <AnnouncementProvider endpoint={process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ann.koroneko.co"} />
    </Container>
}