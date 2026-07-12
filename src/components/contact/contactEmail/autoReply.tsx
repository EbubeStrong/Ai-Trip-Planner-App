import {
  Body,
  Container,
  Heading,
  Html,
  Text,
} from "@react-email/components";


export function AutoReply({
  name,
}: {
  name: string;
}) {
  return (
    <Html>
      <Body>
        <Container>

          <Heading>
            Thanks for contacting me!
          </Heading>

          <Text>
            Hi {name},
          </Text>

          <Text>
            I&apos;ve received your message and
            will get back to you soon.
          </Text>

        </Container>
      </Body>
    </Html>
  );
}