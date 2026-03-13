import { useState } from 'react';
import { Container, TextInput, PasswordInput, Button, Title, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  }

  return (
    <Container size={420} py={80}>
      <Title ta="center" c="#013736">GHIDORA</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>Ticket Management System</Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Username"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="md"
        />
        {error && <Text c="red" size="sm" mt="sm">{error}</Text>}
        <Button
          fullWidth
          mt="xl"
          color="#013736"
          onClick={handleLogin}
          loading={loading}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}