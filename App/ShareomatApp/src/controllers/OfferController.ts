const ip = process.env.IP;
const port = process.env.PORT;

export async function getActiveOffers() {
  const response = await fetch(`http://${ip}:${port}/offer/getActiveOffers`);
  return response.json();
};

export async function getOfferById(id: number) {
  const response = await fetch(`http://${ip}:${port}/offer/getOfferById/${id}`);
  return response.json();
};