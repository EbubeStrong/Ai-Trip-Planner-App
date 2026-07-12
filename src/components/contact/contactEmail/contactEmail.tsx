import {
  Body,
  Container,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  message: string;
}

export function ContactEmail({
  name,
  email,
  message,
}: Props) {
  return (
    <Html>
      <Body>
        <Container>

          <Heading>
            New Contact Form Submission
          </Heading>

          <Section>
            <Text>
              <strong>Name:</strong> {name}
            </Text>

            <Text>
              <strong>Email:</strong> {email}
            </Text>

            <Text>
              <strong>Message:</strong>
            </Text>

            <Text>{message}</Text>

          </Section>

        </Container>
      </Body>
    </Html>
  );
}