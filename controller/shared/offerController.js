// controllers/offerController.js
import Offer from "../../models/offerModel.js";

export const createOffer = async (req, res) => {
  try {
    const adminId = req.user.id;
    const {
      title,
      discountType,
      bodyText,
      discountWorth,
      amount,
      minPurchase,
      startDate,
      startTime,
      endDate,
      endTime,
    } = req.body;

    const image = req.file;
    if (!image) {
      return res.status(400).json({ error: "Image upload failed or missing" });
    }
    console.log("Uploaded Image File:", image);
    const imageUrl = image.path;

    const startsAt = new Date(`${startDate}T${startTime}`);
    const endsAt = new Date(`${endDate}T${endTime}`);

    const offer = new Offer({
      title,
      discountType,
      bodyText,
      discountWorth,
      amount,
      thumbnail: imageUrl,
      minPurchase,
      startsAt: startsAt,
      endsAt: endsAt,
      createdBy: adminId,
    });

    await offer.save();
    res
      .status(201)
      .json({ message: "Offer created successfully", data: offer });
  } catch (error) {
    console.error("Create Offer Error:", error);
    res.status(500).json({ error: "Failed to create offer" });
  }
};
