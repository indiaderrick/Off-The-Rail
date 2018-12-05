export function handleChange(e) {
  const { target: {name, value} } = e;
  this.setState({ [name]: value });
}
