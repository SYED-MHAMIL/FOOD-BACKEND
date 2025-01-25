import express from "express";
import Food from "../models/foodmodel.js";
import multer from "multer";
let router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;
  const { name, price } = req.body;
  try {
    //field condition
    if (!name || !price || !file) {
      return res.status(404).send({
        message: "All field are Required",
      });
    }

    // plain object
    const newFood = {
      name: req.body.name,
      price: req.body.price,
      filename: file.originalname, // Original file ka naam
      contentType: file.mimetype, // File ka type
      fileData: file.buffer,
    };
    const food = new Food(newFood);
    const saveFood = await food.save();
    res
      .status(202)
      .send({ message: "Food Created Successfully", data: saveFood });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Food.find();
    res.send({ data });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

// deleted

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Food.findByIdAndDelete({ _id: id });
    if (!data) return res.status(404).send({ msg: "item not found" });

    res.status(200).send({ msg: "successfully Delete" });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

router.put("/:id", upload.single("file"), async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  const { name, price } = req.body;
  try {
    //field condition
    if (!name || !price || !file) {
      return res.status(404).send({
        message: "All field are Required",
      });
    }

    // plain object
    const newFood = {
      name: req.body.name,
      price: req.body.price,
      filename: file.originalname, // Original file ka naam
      contentType: file.mimetype, // File ka type
      fileData: file.buffer,
    };
    const data = await Food.findByIdAndUpdate(
      id,
      { ...newFood },
      { new: true }
    );
    if (!data) return res.status(404).send({ msg: "food not found" });

    res.status(200).send({ msg: "food successfully updated", data });
  } catch (error) {
    res.status(404).send({ msg: error });
  }
});

//getting specific food
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Food.findById(id);
    if (!data) return res.status(404).send({ msg: "food not found" });

    res.status(200).send({ msg: "food successfully dispatch", data });
  } catch (error) {
    res.status(404).send({ msg: "food not found by id" });
  }
});

export default router;
