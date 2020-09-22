export async function getPolls() {
  const response = await fetch(`/api/polls/`);
  const jsonResponse = await response.json();
  if (response.status === 200) {
    return jsonResponse;
  } else {
    const errors = jsonResponse.errors.map(({ msg }) => msg).join('\n');
    window.alert(`The following errors occured:\n${errors}`);
    return false;
  }
}
