import express from "express";
import {
  addOffer,
  getActiveOffers,
  getOfferByCardId,
} from "../controllers/offer";

const router = express.Router();

router.post("/addOffer", addOffer);

router.get("/getActiveOffers", getActiveOffers);
// get offers from a specific card
router.get("/getCardOffers", getOfferByCardId);

export default router;
