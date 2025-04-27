import LayoutAdmin from "@/components/ui/layouts/layout-admin";
import { Avatar, Badge, Button, Card, Alert } from "@chakra-ui/react";

function Admin() {
  return (
    <div>
      <Alert.Root status="info" title="This is the alert title">
        <Alert.Indicator />
        <Alert.Title>This is the alert title</Alert.Title>
      </Alert.Root>
      <Button variant={"outline"}>FOOOO2</Button>
      <Badge>BAR</Badge>
      <Avatar.Root>
        <Avatar.Fallback name="Segun Adebayo" />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
      <Card.Root width="320px">
        <Card.Body gap="2">
          <Avatar.Root size="lg" shape="rounded">
            <Avatar.Image src="https://picsum.photos/200/300" />
            <Avatar.Fallback name="Nue Camp" />
          </Avatar.Root>
          <Card.Title mt="2">Nue Camp</Card.Title>
          <Card.Description>
            This is the card body. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
            Curabitur nec odio vel dui euismod fermentum.
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">View</Button>
          <Button>Join</Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}

export default Admin;

Admin.getLayout = function getLayout(page) {
  return <LayoutAdmin>{page}</LayoutAdmin>;
};
