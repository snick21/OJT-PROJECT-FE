import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Title,
  Group,
  Paper,
  Avatar,
  Select,
  Textarea,
  Stack,
  Box,
  Loader,
  Center
} from "@mantine/core";

import { IconChevronRight, IconUsers, IconMail, IconPhoto, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../api/authApi";
import { submitTicket } from "../api/ticketApi";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";

export default function SubmitTicket() {

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [typeOfIssue, setTypeOfIssue] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMe().then(setUser);
  }, []);

  async function handleSubmit() {
    if (!typeOfIssue) return;
    setSubmitting(true);
    const success = await submitTicket({
      type_of_issue: typeOfIssue,
      priority: "normal",
      type: "internal",
      description,
    });
    if (success) navigate("/");
    setSubmitting(false);
  }

  if (!user) return <Center h={300}><Loader color="convergeTeal" /></Center>;

  return (
    <Container size="xl" py="lg">

      {/* BREADCRUMB */}
      <Group mb="lg">
        <Text fw={700} c="convergeTeal.9">GHIDORA</Text>
        <IconChevronRight size={16} color="#424242" />
        <Text fw={600} c="#424242">Submit Ticket</Text>
      </Group>

      {/* PAGE TITLE ROW */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Submit Ticket</Title>
      </Group>

      {/* USER INFO BAR */}
      <Paper withBorder radius="md" p="sm" mb="xl">
        <Group justify="space-between">
          <Group>
            <Avatar radius="xl" style={{ background: "#E6F4F4", color: "#038F8D" }}>
              <IconUser size={18} />
            </Avatar>
            <Text>{user.username}</Text>
          </Group>
          <Group>
            <Avatar radius="xl" style={{ background: "#E6F4F4", color: "#038F8D" }}>
              <IconUsers size={18} />
            </Avatar>
            <Text>{user.profile?.team?.name || "No team assigned"}</Text>
          </Group>
          <Group>
            <Avatar radius="xl" style={{ background: "#E6F4F4", color: "#038F8D" }}>
              <IconMail size={18} />
            </Avatar>
            <Text>{user.email}</Text>
          </Group>
        </Group>
      </Paper>

      {/* FORM — centered, ~60% width to match design */}
      <Stack gap="md" w="60%" mx="auto">

        {/* CATEGORY */}
        <Box>
          <Text size="sm" fw={500} mb={6}>Category</Text>
          <Select
            placeholder="Choose a type of category"
            data={[
              { value: "it", label: "IT Support" },
              { value: "network", label: "Network" },
              { value: "hardware", label: "Hardware" },
            ]}
            value={category}
            onChange={setCategory}
            styles={(theme) => ({
              input: {
                borderColor: category ? theme.colors.convergeTeal[5] : theme.colors.gray[4],
                borderWidth: "1.5px",
                transition: "border-color 0.2s ease",
              },
            })}
          />
        </Box>

        {/* TYPE OF ISSUE */}
        <Box>
          <Text size="sm" fw={500} mb={6}>Type of Issue</Text>
          <Select
            placeholder="Choose a type of issue"
            data={[
              { value: "Network Connectivity Issue", label: "Network Connectivity Issue" },
              { value: "Software Issue", label: "Software Issue" },
              { value: "Hardware Issue", label: "Hardware Issue" },
            ]}
            value={typeOfIssue}
            onChange={setTypeOfIssue}
            styles={(theme) => ({
              input: {
                borderColor: typeOfIssue ? theme.colors.convergeTeal[5] : theme.colors.gray[4],
                borderWidth: "1.5px",
                transition: "border-color 0.2s ease",
              },
            })}
          />
        </Box>

        {/* DESCRIPTION */}
        <Box>
          <Text size="sm" fw={500} mb={6}>Issues Overview</Text>
          <Textarea
            placeholder="Issues Overview..."
            minRows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            styles={(theme) => ({
              input: {
                borderColor: description ? theme.colors.convergeTeal[5] : theme.colors.gray[4],
                borderWidth: "1.5px",
                transition: "border-color 0.2s ease",
              },
            })}
          />
        </Box>

        {/* UPLOAD BOX */}
        <Paper
          radius="md"
          p="xl"
          style={{ border: "2px dashed #CED4DA", textAlign: "center", cursor: "pointer" }}
        >
          <Stack align="center" gap="xs">
            <Avatar radius="xl" size="lg" color="convergeTeal">
              <IconPhoto size={22} />
            </Avatar>
            <Text fw={600}>
              <Text component="span" fw={700} c="convergeTeal.5">Upload</Text>{" "}
              <Text component="span">Image</Text>
            </Text>
            <Text size="xs" c="dimmed">
              File size of your image should not exceed to 10MB.
            </Text>
          </Stack>
        </Paper>

        {/* ACTION BUTTONS */}
        <Group justify="center" mt="sm">
          <SecondaryButton label="Cancel" onClick={() => navigate("/")} />
          <PrimaryButton label="Submit Ticket" onClick={handleSubmit} />
        </Group>

      </Stack>

    </Container>
  );
}