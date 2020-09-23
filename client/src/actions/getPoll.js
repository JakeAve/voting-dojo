export async function getPoll(id) {
  const response = await fetch(`/api/polls/${id}`);
  const jsonResponse = await response.json();
  if (response.status === 200) {
    return jsonResponse;
  } else {
    const errors = jsonResponse.errors.map(({ msg }) => msg).join('\n');
    window.alert(`The following errors occured:\n${errors}`);
    return false;
  }
}
