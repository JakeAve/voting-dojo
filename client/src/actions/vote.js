export async function vote(pollId, optionId) {
  const response = await fetch(`/api/vote/${pollId}/${optionId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const jsonResponse = await response.json();
  if (response.status === 200) {
    return jsonResponse;
  } else {
    const errors = jsonResponse.errors.map(({ msg }) => msg).join('\n');
    window.alert(`The following errors occured:\n${errors}`);
    return false;
  }
}
