import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
  Button,
} from "react-email";

type EmailInvitationProps = {
  fromUser: string;
  fromOrganization: string;
  url: string;
};

const EmailInvitation = ({
  fromUser,
  fromOrganization,
  url,
}: EmailInvitationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-center">
          <Container>
            <Section>
              <Text>
                Hello there, {fromUser}, invited you to join {fromOrganization}.
                Click the link below to accept the invitation.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-black rounded text-white p-2 m-2"
              >
                Accept Invitation
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailInvitation.PreviewProps = {
  fromUser: "Volynets Yan",
  fromOrganization: "Volynets Inc.",
  url: "https://localhost:3000/email-invitation/abc123",
} as EmailInvitationProps;

export default EmailInvitation;
