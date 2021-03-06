import { Spinner } from "@geist-ui/react";
import { ConfigResponse } from "@micro/api";
import styled from "styled-components";
import useSWR from "swr";
import { Container } from "../components/Container";
import { Endpoints } from "../constants";

const HomeWrapper = styled.div`
  padding-top: 5em;
`;

export default function Home() {
  const server = useSWR<ConfigResponse>(Endpoints.CONFIG, url => fetch(url).then(r => r.json())); // prettier-ignore
  const domains = server.data?.domains ?? [];
  const loading = !server.data && !server.error;

  return (
    <Container>
      <HomeWrapper>
        <h1>Micro</h1>
        <p>
          An invite-only file sharing service with vanity domains and a ShareX compatible endpoint.
          Sign in to download a generated ShareX configuration.
        </p>
        <h3>Domains</h3>
        <ul>{loading ? <Spinner /> : domains.map((domain) => <li key={domain}>{domain}</li>)}</ul>
        <h3>Rules</h3>
        <ol>
          <li>Do not upload NSFW content.</li>
          <li>Do not upload illegal content.</li>
          <li>Do not upload content you do not own.</li>
          <li>
            Don't upload excessive amounts of content. This is a file sharing server, not a file
            storage server.
          </li>
        </ol>
        <h3>Contact</h3>
        <p>
          To get an account or get a file taken down, email{" "}
          <a href="mailto:ryan@sylver.me">ryan@sylver.me</a>.
        </p>
      </HomeWrapper>
    </Container>
  );
}
