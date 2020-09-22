export async function createPoll(payload) {
  const response = await fetch('/api/polls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const jsonResponse = await response.json();
  if (response.status === 200) {
    window.alert('The new poll was created!');
    return true;
  } else {
    const errors = jsonResponse.errors.map(({ msg }) => msg).join('\n');
    window.alert(`The following errors occured:\n${errors}`);
    return false;
  }
}
