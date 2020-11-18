const mapApiItemsAsOptions = items => {
  return items.map(item => ({
    value: item.id,
    text: item.title
  }));
};

export default mapApiItemsAsOptions;
